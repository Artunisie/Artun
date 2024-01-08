package com.Martun.historyService.repository;

import com.Martun.historyService.entity.CreateDemandeHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DemandeHistoryRepository extends JpaRepository<CreateDemandeHistory, Long> {

}

