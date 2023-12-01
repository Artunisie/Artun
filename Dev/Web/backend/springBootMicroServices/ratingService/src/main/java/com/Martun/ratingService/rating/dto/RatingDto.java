package com.Martun.ratingService.rating.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class RatingDto {

    private int numberOfStars;
    private String comment;

}
