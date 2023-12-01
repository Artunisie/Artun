package com.Martun.ratingService.rating.controller.clients;

import com.Martun.ratingService.rating.dto.feignClientsDto.hisotryService.RatingHistoryDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "history-service", url = "http://localhost:8005/artun/history/rating")
public interface HistoryServiceFeignClient {

    @PostMapping("/add")
    ResponseEntity<String> saveRatingHistory(@RequestBody RatingHistoryDto ratingHistory);


    @GetMapping("/getUser/{userId}/rateUser/{ratedUserId}")
    ResponseEntity<RatingHistoryDto> getUserRatingHistory(@PathVariable Long userId, @PathVariable Long ratedUserId);

}