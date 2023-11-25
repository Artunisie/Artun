package com.Martun.ratingService.rating.service;

import com.Martun.ratingService.rating.controller.clients.HistoryServiceFeignClient;
import com.Martun.ratingService.rating.controller.clients.UserServiceFeignClient;
import com.Martun.ratingService.rating.dto.RatingDto;
import com.Martun.ratingService.rating.dto.feignClientsDto.hisotryService.RatingHistoryDto;
import com.Martun.ratingService.rating.entity.CommentEntity;
import com.Martun.ratingService.rating.entity.RatingEntity;
import com.Martun.ratingService.rating.exceptions.HistoryNotFoundException;
import com.Martun.ratingService.rating.exceptions.UserNotFoundException;
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
    private final UserServiceFeignClient feignClient;
    private final HistoryServiceFeignClient historyServiceFeignClient;


    public RatingEntity saveRating(Long ratedUserId, RatingDto rating) throws UserNotFoundException {
        String userType = "";
        String evaluator_type = "";
        String evaluator_recipient_type = "";
        Boolean exists = false;

        try {
            ResponseEntity<?> userServiceResponse = feignClient.ifUserExists(ratedUserId);
            if (userServiceResponse.getStatusCode() == HttpStatus.OK) {
                Map<String, Boolean> userExists = (Map<String, Boolean>) userServiceResponse.getBody();
                Map.Entry<String, Boolean> entry = null;
                if (userExists != null) {
                    entry = userExists.entrySet().iterator().next();
                }
                userType = entry.getKey();
                exists = entry.getValue();
            }
        } catch (Exception e) {
            throw new UserNotFoundException("Le user avec l'ID " + ratedUserId + " n'existe pas.");
        }
        if (exists) {
            RatingEntity ratingEntity = getRatedUserEntity(ratedUserId);

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

            calculateNote(ratingEntity);
            RatingEntity savedRating = saveOrUpdateRatingEntity(ratingEntity);
            saveRatinghistory(rating,savedRating);

            return savedRating;
        } else {
            throw new UserNotFoundException("Le user avec l'ID " + ratedUserId + " n'existe pas.");
        }
    }

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

    private void saveRatinghistory( RatingDto ratingDto, RatingEntity ratingEntity){
        RatingHistoryDto historyDto = new RatingHistoryDto();
        historyDto.setRatedUserId(ratingEntity.getRatedUserId());
        historyDto.setNombreEtoilesDonner(ratingDto.getNumberOfStars());
        historyDto.setUserId(ratingDto.getEvaluatorId());
        historyDto.setComment(ratingDto.getComment());
        historyServiceFeignClient.saveRatingHistory(historyDto);
    }

   /* private boolean ifUserAlreadyRated(Long userId, Long ratedUserId){
        boolean ratingExicte = historyServiceFeignClient.ifUserHaveRatedAlready(userId, ratedUserId);
        if(ratingExicte){


        }else
            throw new HistoryNotFoundException("")


    }*/


}
