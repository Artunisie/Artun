package com.Martun.ratingService.rating.service;

import com.Martun.ratingService.rating.controller.clients.HistoryServiceFeignClient;
import com.Martun.ratingService.rating.controller.clients.UserServiceFeignClient;
import com.Martun.ratingService.rating.dto.RatingDto;
import com.Martun.ratingService.rating.dto.feignClientsDto.hisotryService.RatingHistoryDto;
import com.Martun.ratingService.rating.entity.CommentEntity;
import com.Martun.ratingService.rating.entity.RatingEntity;
import com.Martun.ratingService.rating.exceptions.HistoryNotFoundException;
import com.Martun.ratingService.rating.exceptions.UserNotFoundException;
import com.Martun.ratingService.rating.repository.CommentRepository;
import com.Martun.ratingService.rating.repository.RatingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

import static com.Martun.ratingService.rating.enumerations.UserTypeEnum.CLIENT;
import static com.Martun.ratingService.rating.enumerations.UserTypeEnum.TECHNICIAN;

@Service
@RequiredArgsConstructor
@Slf4j
public class RatingService {
    private final RatingRepository ratingRepository;
    private final CommentRepository commentRepository;
    private final UserServiceFeignClient feignClient;
    private final HistoryServiceFeignClient historyServiceFeignClient;

    public RatingEntity saveRating(Long ratedUserId, Long evaluatorId, RatingDto rating) throws UserNotFoundException {
        // Vérifier d'abord si l'utilisateur existe
        try {
            ResponseEntity<?> userServiceResponse = feignClient.ifUserExists(ratedUserId);
            if (userServiceResponse.getStatusCode() == HttpStatus.OK) {

                Map<String, Boolean> userExists = (Map<String, Boolean>) userServiceResponse.getBody();

                if (userExists != null && !userExists.isEmpty()) {
                    Map.Entry<String, Boolean> entry = userExists.entrySet().iterator().next();
                    String userType = entry.getKey();
                    Boolean exist = entry.getValue();

                    if (exist) {
                        RatingEntity ratingEntity = getRatedUserEntity(ratedUserId);

                        // Vérifier si l'utilisateur a déjà évalué
                        if (ifUserHasAlreadyRated(evaluatorId, ratedUserId)) {
                            RatingDto oldRating = getOldRatingDto(evaluatorId, ratedUserId);
                            return updateExistingRating(evaluatorId, oldRating, rating, ratingEntity);
                        } else {
                            // Enregistrer un nouveau rating
                            return saveNewRating(ratedUserId, rating, userType, ratingEntity);
                        }
                    }
                }
            }
        } catch (Exception e) {
            throw new UserNotFoundException("Erreur lors de la vérification de l'existence de l'utilisateur avec l'ID " + ratedUserId);
        }
        return null;
    }


    // Recuperer l'entity Rating (it can be an old rating or a new one)
    private RatingEntity getRatedUserEntity(Long ratedUserId) {
        Optional<RatingEntity> optionalRatingEntity = ratingRepository.findByRatedUserId(ratedUserId);
        if (optionalRatingEntity.isPresent()) {
            return optionalRatingEntity.get();
        } else {
            RatingEntity ratingEntity = new RatingEntity();
            ratingEntity.setRatedUserId(ratedUserId);
            ratingEntity.setCommentEntity(new ArrayList<>());
            return ratingEntity;
        }
    }

    // Calculer la note
    private void calculateNote(RatingEntity ratingEntity) {
        int totalPoints = (ratingEntity.getNb1Star()) + (ratingEntity.getNb2Star() * 2) +
                (ratingEntity.getNb3Star() * 3) + (ratingEntity.getNb4Star() * 4) +
                (ratingEntity.getNb5Star() * 5);

        if (ratingEntity.getNbRates() > 0) {
            ratingEntity.setNote((double) totalPoints / ratingEntity.getNbRates());
        } else {
            ratingEntity.setNote(0.0);
        }
    }

    private RatingEntity saveOrUpdateRatingEntity(RatingEntity ratingEntity) {
        return ratingRepository.save(ratingEntity);
    }

    private void saveRatinghistory(RatingDto ratingDto, RatingEntity ratingEntity) {
        RatingHistoryDto historyDto = new RatingHistoryDto();
        historyDto.setRatedUserId(ratingEntity.getRatedUserId());
        historyDto.setNombreEtoilesDonner(ratingDto.getNumberOfStars());
        historyDto.setUserId(ratingDto.getEvaluatorId());
        historyDto.setComment(ratingDto.getComment());
        historyServiceFeignClient.saveRatingHistory(historyDto);
    }

    private void updateRatingHistory() {

    }


    public boolean ifUserHasAlreadyRated(Long userId, Long ratedUserId) {
        boolean oldRating = false;
        try {
            ResponseEntity<RatingHistoryDto> responseEntity = historyServiceFeignClient.getUserRatingHistory(userId, ratedUserId);
            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                log.info(responseEntity.getBody().toString());
                oldRating = true;
            }
        } catch (Exception e) {
            log.error("Une erreur s'est produite lors de la récupération de l'historique des évaluations de l'utilisateur peut etre n'existe pas", e);
        }
        return oldRating; // Ajoutez cette ligne
    }


    // Est appeler dans la methode getOldRatingDto
    private RatingHistoryDto getRatingHistoryData(Long userId, Long ratedUserId) throws Exception {
        try {
            ResponseEntity<RatingHistoryDto> responseEntity = historyServiceFeignClient.getUserRatingHistory(userId, ratedUserId);
            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                log.info(responseEntity.getBody().toString());
                return responseEntity.getBody();
            } else {
                throw new Exception("Error: Response status is not successful");
            }
        } catch (Exception e) {
            throw new Exception("Error in get rating history data", e);
        }
    }


    private RatingDto getOldRatingDto(Long userId, Long ratedUserId) throws Exception {
        RatingHistoryDto ratingHistoryDto = getRatingHistoryData(userId, ratedUserId);

        RatingDto ratingDto = new RatingDto();
        ratingDto.setEvaluatorId(ratingHistoryDto.getUserId());
        ratingDto.setComment(ratingHistoryDto.getComment());
        ratingDto.setNumberOfStars(ratingHistoryDto.getNombreEtoilesDonner());
        return ratingDto;
    }


    private RatingEntity saveNewRating(Long ratedUserId, RatingDto rating, String userType, RatingEntity ratingEntity) {
        log.info("into save new rating function");

        String evaluator_type = "";
        String evaluator_recipient_type = "";
        int nbStars = rating.getNumberOfStars();

        switch (nbStars) {
            case 1 -> ratingEntity.setNb1Star(ratingEntity.getNb1Star() + 1);
            case 2 -> ratingEntity.setNb2Star(ratingEntity.getNb2Star() + 1);
            case 3 -> ratingEntity.setNb3Star(ratingEntity.getNb3Star() + 1);
            case 4 -> ratingEntity.setNb4Star(ratingEntity.getNb4Star() + 1);
            case 5 -> ratingEntity.setNb5Star(ratingEntity.getNb5Star() + 1);
            default -> throw new IllegalArgumentException("Le nombre d'étoiles doit être compris entre 1 et 5.");
        }
        ratingEntity.setNbRates(ratingEntity.getNbRates() + 1);
        ratingEntity.setRatedUserType(userType);

        if (userType == CLIENT.name()) {
            evaluator_recipient_type = CLIENT.name();
            evaluator_type = TECHNICIAN.name();
        } else if (userType == TECHNICIAN.name()) {
            evaluator_recipient_type = TECHNICIAN.name();
            evaluator_type = CLIENT.name();
        }

        CommentEntity commentEntity = new CommentEntity();
        commentEntity.setComment(rating.getComment());
        commentEntity.setEvaluator_id(rating.getEvaluatorId());
        commentEntity.setEvaluator_recipient_id(ratedUserId);
        commentEntity.setEvaluator_recipient_type(evaluator_recipient_type);
        commentEntity.setEvaluator_type(evaluator_type);
        commentEntity.setRating(ratingEntity);
        ratingEntity.getCommentEntity().add(commentEntity);
        // calculer le note
        calculateNote(ratingEntity);
        // Sauvgarder le rating
        RatingEntity savedRating = saveOrUpdateRatingEntity(ratingEntity);
        // Sauvgarder l'historique
        saveRatinghistory(rating, savedRating);
        return savedRating;

    }

    private RatingEntity updateExistingRating(Long evaluatorId, RatingDto oldRating, RatingDto newRating, RatingEntity ratingEntity) {
        log.info("into update existing rating function");
        int oldStars = oldRating.getNumberOfStars();
        int newStars = newRating.getNumberOfStars();
        String newComment = newRating.getComment();

        switch (oldStars) {
            case 1 -> ratingEntity.setNb1Star(ratingEntity.getNb1Star() - 1);
            case 2 -> ratingEntity.setNb2Star(ratingEntity.getNb2Star() - 1);
            case 3 -> ratingEntity.setNb3Star(ratingEntity.getNb3Star() - 1);
            case 4 -> ratingEntity.setNb4Star(ratingEntity.getNb4Star() - 1);
            case 5 -> ratingEntity.setNb5Star(ratingEntity.getNb5Star() - 1);
        }

        switch (newStars) {
            case 1 -> ratingEntity.setNb1Star(ratingEntity.getNb1Star() + 1);
            case 2 -> ratingEntity.setNb2Star(ratingEntity.getNb2Star() + 1);
            case 3 -> ratingEntity.setNb3Star(ratingEntity.getNb3Star() + 1);
            case 4 -> ratingEntity.setNb4Star(ratingEntity.getNb4Star() + 1);
            case 5 -> ratingEntity.setNb5Star(ratingEntity.getNb5Star() + 1);
        }
        calculateNote(ratingEntity);

        for (CommentEntity commentEntity : ratingEntity.getCommentEntity()) {
            if (commentEntity.getEvaluator_id().equals(evaluatorId)) {
                // mise à jour du commentaire
                commentEntity.setComment(newComment);
                break;
            }
        }
        // Sauvgarder le rating
        return saveOrUpdateRatingEntity(ratingEntity);
    }


}
