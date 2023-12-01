package com.Martun.historyService.controller;

import com.Martun.historyService.entity.UserRatingHistory;
import com.Martun.historyService.exceptions.HistoryNotFoundException;
import com.Martun.historyService.service.UserRatingHistoryService;
import lombok.RequiredArgsConstructor;
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


    @GetMapping("/checkIfUser/{userId}/rateUser/{ratedUserId}")
    public ResponseEntity<UserRatingHistory> getUserRatingHistory(@PathVariable Long userId, @PathVariable Long ratedUserId) {
        try {
            UserRatingHistory ratingHistory = userRatingHistoryService.ifUserReatedAlready(userId, ratedUserId);
            return ResponseEntity.ok(ratingHistory);
        } catch (HistoryNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}



