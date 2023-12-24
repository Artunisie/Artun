package com.Martun.ratingService.rating.service;

import com.Martun.ratingService.rating.controller.clients.HistoryServiceFeignClient;
import com.Martun.ratingService.rating.controller.clients.UserServiceFeignClient;
import com.Martun.ratingService.rating.dto.RatingDto;
import com.Martun.ratingService.rating.dto.feignClientsDto.hisotryService.RatingHistoryDto;
import com.Martun.ratingService.rating.entity.CommentEntity;
import com.Martun.ratingService.rating.entity.RatingEntity;
import com.Martun.ratingService.rating.exceptions.UserNotFoundException;
import com.Martun.ratingService.rating.repository.RatingRepository;
import feign.FeignException;
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
    private final UserServiceFeignClient feignClient;
    private final HistoryServiceFeignClient historyServiceFeignClient;
    private Long OldRatingHistoryId = null;

    public RatingEntity saveRating(Long ratedUserId, Long evaluatorId, RatingDto rating) throws Exception {
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
                        boolean alreadyRated = hasUserAlreadyRated(evaluatorId, ratedUserId);
                        // Vérifier si l'utilisateur a déjà évalué
                        if (alreadyRated) {
                            RatingDto oldRating = getOldRatingDto(evaluatorId, ratedUserId);
                            return updateExistingRating(evaluatorId, oldRating, rating, ratingEntity);
                        } else {
                            // Enregistrer un nouveau rating
                            return saveNewRating(ratedUserId, evaluatorId, rating, userType, ratingEntity);
                        }
                    }
                }
            }
        } catch (FeignException feignException) {
            log.error("error in saveRating Methode: " + feignException.getMessage());
            log.error("Feign Exception Body: " + feignException.contentUTF8());
            throw new RuntimeException(feignException.getMessage());
        } catch (IllegalArgumentException e) {
            log.info(e.getMessage());
            throw new IllegalArgumentException("Le nombre d'étoiles doit être compris entre 1 et 5.");
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

    // Sauvgarder l'historique de rating
    private void saveRatinghistory(Long evaluatorId, RatingDto ratingDto, RatingEntity ratingEntity) {
        try {
            RatingHistoryDto historyDto = new RatingHistoryDto();

            historyDto.setRatedUserId(ratingEntity.getRatedUserId());
            historyDto.setNombreEtoilesDonner(ratingDto.getNumberOfStars());
            historyDto.setUserId(evaluatorId);
            historyDto.setComment(ratingDto.getComment());
            historyServiceFeignClient.saveRatingHistory(historyDto);
        } catch (FeignException feignException) {
            log.error("error in saveRatinghistory Methode: " + feignException.getMessage());
            throw new RuntimeException(feignException.getMessage());

        }
    }

    // Mettre a jour le historique de rating
    public void updateRatingHistory(Long ratingHistoryId, RatingDto ratingDto)  {
        try {
            RatingHistoryDto newRatingHistory = new RatingHistoryDto();
            newRatingHistory.setComment(ratingDto.getComment());
            newRatingHistory.setNombreEtoilesDonner(ratingDto.getNumberOfStars());
            historyServiceFeignClient.updateRatingHistory(ratingHistoryId, newRatingHistory);
        } catch (FeignException e) {
            log.error("Erreur lors de la mise à jour des données ");
            log.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }


    public boolean hasUserAlreadyRated(Long userId, Long ratedUserId) {
        try {
            ResponseEntity<RatingHistoryDto> responseEntity = historyServiceFeignClient.getUserRatingHistory(userId, ratedUserId);
            if (responseEntity.getStatusCode() == HttpStatus.OK) {
                System.out.println("User has already rated: " + responseEntity.getBody());
                return true;
            }
        } catch (FeignException feignException) {
            if (feignException.status() == HttpStatus.NOT_FOUND.value()) {
                System.out.println("User has not rated yet.");
                return false;
            } else {
                System.out.println("Feign Exception: " + feignException.getMessage());
                throw new RuntimeException("Error while checking user rating", feignException);
            }
        }
        return false;
    }

        // Est appeler dans la methode getOldRatingDto
        private RatingHistoryDto getRatingHistoryData (Long userId, Long ratedUserId){
            try {
                ResponseEntity<RatingHistoryDto> responseEntity = historyServiceFeignClient.getUserRatingHistory(userId, ratedUserId);
                if (responseEntity.getStatusCode().is2xxSuccessful()) {
                    log.info(responseEntity.getBody().toString());
                    return responseEntity.getBody();
                }
            } catch (FeignException e) {
                log.error("error in getRatingHistoryData Methode: " + e.getMessage());
                throw new RuntimeException("Error in get rating history data", e);
            }
            return null;
        }


        private RatingDto getOldRatingDto (Long userId, Long ratedUserId){
            RatingHistoryDto ratingHistoryDto = getRatingHistoryData(userId, ratedUserId);

            RatingDto ratingDto = new RatingDto();
            ratingDto.setComment(ratingHistoryDto.getComment());
            ratingDto.setNumberOfStars(ratingHistoryDto.getNombreEtoilesDonner());
            this.OldRatingHistoryId = ratingHistoryDto.getId();
            return ratingDto;
        }


        private RatingEntity saveNewRating (Long ratedUserId, Long evaluatorId, RatingDto rating, String
        userType, RatingEntity ratingEntity){
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
            //ratingEntity.set

            if (userType == CLIENT.name()) {
                evaluator_recipient_type = CLIENT.name();
                evaluator_type = TECHNICIAN.name();
            } else if (userType == TECHNICIAN.name()) {
                evaluator_recipient_type = TECHNICIAN.name();
                evaluator_type = CLIENT.name();
            }

            CommentEntity commentEntity = new CommentEntity();
            commentEntity.setComment(rating.getComment());
            commentEntity.setEvaluator_id(evaluatorId);
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
            saveRatinghistory(evaluatorId, rating, savedRating);
            return savedRating;

        }

        private RatingEntity updateExistingRating (Long evaluatorId, RatingDto oldRatingDto, RatingDto
        newRatingDto, RatingEntity ratingEntity)  {
            log.info("into update existing rating function");
            int oldStars = oldRatingDto.getNumberOfStars();
            int newStars = newRatingDto.getNumberOfStars();
            String newComment = newRatingDto.getComment();

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
                default -> throw new IllegalArgumentException("Le nombre d'étoiles doit être compris entre 1 et 5.");
            }
            calculateNote(ratingEntity);

            for (CommentEntity commentEntity : ratingEntity.getCommentEntity()) {
                if (commentEntity.getEvaluator_id().equals(evaluatorId)) {
                    // mise à jour du commentaire
                    commentEntity.setComment(newComment);
                    break;
                }
            }
            // Faire une mise à jour de l'historique
            if (this.OldRatingHistoryId != null) {
                updateRatingHistory(this.OldRatingHistoryId, newRatingDto);
            }
            // Sauvgarder le rating
            return saveOrUpdateRatingEntity(ratingEntity);
        }

    }
