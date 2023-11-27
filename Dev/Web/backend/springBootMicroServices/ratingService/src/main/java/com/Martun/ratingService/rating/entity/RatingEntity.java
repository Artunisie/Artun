package com.Martun.ratingService.rating.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Collection;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "rating_entity")
public class RatingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long ratingId;
    private Long ratedUserId;
    private String ratedUserType;
    private int nb1Star;
    private int nb2Star;
    private int nb3Star;
    private int nb4Star;
    private int nb5Star;
    private int nbRates;
    private double note;
    @OneToMany(mappedBy = "rating" ,cascade = CascadeType.ALL)
    @JsonIgnore
    private Collection<CommentEntity> commentEntity;

}
