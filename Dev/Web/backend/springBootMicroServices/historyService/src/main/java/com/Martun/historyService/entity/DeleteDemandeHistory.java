package com.Martun.historyService.entity;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class DeleteDemandeHistory extends HistoryEntry{
    private String offreId;
    private String jobTitle;
    private String jobDescription;
}
