package com.Martun.historyService.controller;

import com.Martun.historyService.entity.CreateDemandeHistory;
import com.Martun.historyService.entity.UserRatingHistory;
import com.Martun.historyService.service.DemandeHistoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/artun/history/client/demande")
@RequiredArgsConstructor
@Slf4j
public class DemandeController {
    private final DemandeHistoryService demandeService;
    @PostMapping(value = "/add")
    public ResponseEntity<String> saveRatingHistory(@RequestBody CreateDemandeHistory createDemandeHistory) {
        log.info(createDemandeHistory.toString());
        String result = demandeService.saveCreateDemandeHistory(createDemandeHistory);
        return ResponseEntity.ok(result);
    }

}
