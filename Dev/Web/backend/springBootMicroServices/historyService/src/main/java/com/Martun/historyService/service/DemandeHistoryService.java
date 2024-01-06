package com.Martun.historyService.service;

import com.Martun.historyService.entity.CreateDemandeHistory;
import com.Martun.historyService.repository.DemandeHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DemandeHistoryService {
    private final DemandeHistoryRepository demandeHistoryRepository;
    private final HistoryService service;


    public String saveCreateDemandeHistory(CreateDemandeHistory demandeHistory) {
        try {
            service.addHistory(demandeHistory);
            demandeHistoryRepository.save(demandeHistory);
            return "Succès : L'historique de création de la demande a été sauvegardé.";
        } catch (Exception e) {
            return "Échec : Une erreur s'est produite lors de la sauvegarde de l'historique de la demande. " + e.getMessage();
        }
    }
}
