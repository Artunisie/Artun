package com.Martun.historyService.repository;

import com.Martun.historyService.entity.CreateDemandeHistory;
import com.Martun.historyService.entity.DeleteDemandeHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeleteDemandeHistoryRepository extends JpaRepository<DeleteDemandeHistory, Long> {

}
