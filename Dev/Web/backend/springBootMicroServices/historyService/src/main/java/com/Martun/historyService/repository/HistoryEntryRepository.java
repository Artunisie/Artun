package com.Martun.historyService.repository;

import com.Martun.historyService.entity.HistoryEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryEntryRepository extends JpaRepository<HistoryEntry, Long> {

}
