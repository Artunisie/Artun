package com.Martun.ratingService.rating.controller;

import com.Martun.ratingService.rating.controller.clients.UserServiceFeignClient;
import com.Martun.ratingService.rating.dto.RatingDto;
import com.Martun.ratingService.rating.entity.RatingEntity;
import com.Martun.ratingService.rating.exceptions.UserNotFoundException;
import com.Martun.ratingService.rating.service.RatingService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/artun/rating")
@AllArgsConstructor
@Slf4j
public class RatingController {
    private final RatingService ratingService;
    private final UserServiceFeignClient feignClient;

    @PostMapping("/user/{evaluatorId}/rate/{clientId}")
    public ResponseEntity<?> saveRating(@PathVariable("clientId") Long ratedUserId, @PathVariable("evaluatorId") Long evaluatorId, @RequestBody RatingDto rating) {
        try {
            RatingEntity savedRating = ratingService.saveRating(ratedUserId, evaluatorId, rating);
            return new ResponseEntity<>(savedRating, HttpStatus.OK);
        } catch (IllegalArgumentException ex) {
            return new ResponseEntity<>("Le nombre d'étoiles doit être compris entre 1 et 5.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>("Une erreur inattendue s'est produite.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    /* ****************Methode de teste va etre supprimer apres ***********************************************************************************/
    @GetMapping("/user/{userId}/rated/{ratedUserId}")
    public ResponseEntity<Boolean> checkUserRating(@PathVariable Long userId, @PathVariable Long ratedUserId) {
        boolean hasRated = ratingService.hasUserAlreadyRated(userId, ratedUserId);
        return ResponseEntity.ok(hasRated);
    }
    /* ********************************************************************************************************************************************/


}
