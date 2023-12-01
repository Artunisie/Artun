package com.Martun.ratingService.rating.controller;

import com.Martun.ratingService.rating.controller.clients.UserServiceFeignClient;
import com.Martun.ratingService.rating.dto.RatingDto;
import com.Martun.ratingService.rating.entity.RatingEntity;
import com.Martun.ratingService.rating.exceptions.UserNotFoundException;
import com.Martun.ratingService.rating.service.RatingService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/artun/rating")
@AllArgsConstructor
public class RatingController {
    private final RatingService ratingService;
    private final UserServiceFeignClient feignClient;

   /* @PostMapping("/rate/{clientId}")
    public ResponseEntity<?> saveRating(@PathVariable("clientId") Long ratedUserId, @RequestBody RatingDto rating) {
        try {
            RatingEntity savedRating = ratingService.saveRating(ratedUserId, rating);
            return new ResponseEntity<>(savedRating, HttpStatus.OK);
        } catch (UserNotFoundException ex) {
            return new ResponseEntity<>("L'utilisateur avec l'ID " + ratedUserId + " n'a pas été trouvé.", HttpStatus.NOT_FOUND);
        }
        catch (IllegalArgumentException ex){
            return new ResponseEntity<>("Le nombre d'étoiles doit être compris entre 1 et 5.",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }*/


    /* ****************Methode de teste va etre supprimer apres ***********************************************************************************/
    @GetMapping("/user/{userId}/rated/{ratedUserId}")
    public ResponseEntity<Boolean> checkUserRating(@PathVariable Long userId, @PathVariable Long ratedUserId) {
        boolean hasRated = ratingService.ifUserHasAlreadyRated(userId, ratedUserId);
        return ResponseEntity.ok(hasRated);
    }
    /* ********************************************************************************************************************************************/


}
