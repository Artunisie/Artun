package com.Martun.historyService.entity;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@Data
@NoArgsConstructor
public class CreateDemandeHistory extends HistoryEntry{
    private String jobTitle;
    private String jobDescription;
    private String hourlyRateMin;
    private String hourlyRateMax;
    private String applicationDeadline;
    private String requirements;
    private String clientId;
}