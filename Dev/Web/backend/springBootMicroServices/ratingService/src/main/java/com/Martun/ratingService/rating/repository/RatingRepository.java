package com.Martun.ratingService.rating.repository;

import com.Martun.ratingService.rating.entity.RatingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RatingRepository extends JpaRepository<RatingEntity,Long> {

    Optional<RatingEntity> findByRatedUserId(Long ratedUserId);
}
