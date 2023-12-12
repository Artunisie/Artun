package com.Martun.historyService.controller;

import com.Martun.historyService.entity.UserRatingHistory;
import com.Martun.historyService.exceptions.HistoryNotFoundException;
import com.Martun.historyService.service.UserRatingHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/artun/history/rating")
@RequiredArgsConstructor
public class UserRatingHistoryController {
    private final UserRatingHistoryService userRatingHistoryService;

    @PostMapping("/add")
    public ResponseEntity<String> saveRatingHistory(@RequestBody UserRatingHistory ratingHistory) {
        String result = userRatingHistoryService.saveRatingHistory(ratingHistory);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/update/{ratingHistoryId}")
    public ResponseEntity<UserRatingHistory> updateRatingHistory(@PathVariable Long ratingHistoryId,@RequestBody UserRatingHistory newRatingHistory) {
        try {
            UserRatingHistory updatedRatingHistory = userRatingHistoryService.updateRatingHistory(ratingHistoryId, newRatingHistory);
            return new ResponseEntity<>(updatedRatingHistory, HttpStatus.OK);
        } catch (HistoryNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/getUser/{userId}/rateUser/{ratedUserId}")
    public ResponseEntity<UserRatingHistory> getUserRatingHistory(@PathVariable Long userId, @PathVariable Long ratedUserId) {
        try {
            UserRatingHistory ratingHistory = userRatingHistoryService.getUserReatedAlreadyData(userId, ratedUserId);
            return ResponseEntity.ok(ratingHistory);
        } catch (HistoryNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }


}



