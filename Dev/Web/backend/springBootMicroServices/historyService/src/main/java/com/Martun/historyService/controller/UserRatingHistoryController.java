package com.Martun.historyService.controller;

import com.Martun.historyService.entity.HistoryEntry;
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
    // nbadelha request paramétre
    @GetMapping("/check/{userId}/rate/{ratedUserId}")
    public ResponseEntity<?> ifUserHaveRatedAlready(@PathVariable Long userId, @PathVariable Long ratedUserId) {
        UserRatingHistory userRatingHistory = new UserRatingHistory();
        try{
            userRatingHistory = userRatingHistoryService.ifUserReatedAlready(userId, ratedUserId);
        }catch (HistoryNotFoundException e){
            return new ResponseEntity<>("Rating History ")

        }
    }
}



