package com.Martun.ratingService.rating.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "comment_entity")
public class CommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long evaluator_recipient_id;
    private String evaluator_recipient_type;
    private Long evaluator_id;
    private String evaluator_type;
    @ManyToOne
    @JoinColumn(name = "rating_id")
    private RatingEntity rating;

    private String comment;
}
