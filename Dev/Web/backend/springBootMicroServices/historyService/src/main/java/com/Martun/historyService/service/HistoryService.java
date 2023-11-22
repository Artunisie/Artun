package com.Martun.historyService.service;

import com.Martun.historyService.entity.*;
import com.Martun.historyService.repository.HistoryEntryRepository;
import com.Martun.historyService.repository.UserRatingHistoryRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


@Service
@Slf4j
@RequiredArgsConstructor
public class HistoryService {

    public void addHistory(HistoryEntry historyEntry) {
        LocalDateTime now = LocalDateTime.now();
        historyEntry.setHistoryDate(now);
    }



}
