package com.Martun.historyService.repository;

import com.Martun.historyService.entity.HistoryEntry;
import com.Martun.historyService.entity.UserRatingHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRatingHistoryRepo extends JpaRepository<UserRatingHistory,Long> {

    UserRatingHistory findUserRatingHistoryByUserIdAndRatedUserId(Long userId, Long ratedUserId);

}
