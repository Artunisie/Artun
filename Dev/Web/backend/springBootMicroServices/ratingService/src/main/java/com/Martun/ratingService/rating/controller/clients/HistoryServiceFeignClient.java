package com.Martun.ratingService.rating.controller.clients;

import com.Martun.ratingService.rating.dto.feignClientsDto.hisotryService.RatingHistoryDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "history-service", url = "http://localhost:8005/artun/history/rating")
public interface HistoryServiceFeignClient {

    @PostMapping("/add")
    ResponseEntity<String> saveRatingHistory(@RequestBody RatingHistoryDto ratingHistory);


    @GetMapping("/getUser/{userId}/rateUser/{ratedUserId}")
    ResponseEntity<RatingHistoryDto> getUserRatingHistory(@PathVariable Long userId, @PathVariable Long ratedUserId);

    @PutMapping("/update/{ratingHistoryId}")
    ResponseEntity<RatingHistoryDto> updateRatingHistory(@PathVariable Long ratingHistoryId,@RequestBody RatingHistoryDto newRatingHistory);


}