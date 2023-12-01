package com.Martun.ratingService.rating.repository;

import com.Martun.ratingService.rating.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {

    CommentEntity findCommentEntityByEvaluator_id(Long evaluatorId);
}
