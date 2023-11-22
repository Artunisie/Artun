package com.Martun.ratingService.rating.dto.feignClientsDto.hisotryService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RatingHistoryDto {

    private Long userId;
    private Long ratedUserId;
    private String comment;
    private int nombreEtoilesDonner;
}
