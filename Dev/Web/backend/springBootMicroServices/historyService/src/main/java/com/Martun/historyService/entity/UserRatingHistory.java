package com.Martun.historyService.entity;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@Data
@NoArgsConstructor
public class UserRatingHistory extends HistoryEntry{

    private Long ratedUserId;
    private String comment;
    private int nombreEtoilesDonner;

}
