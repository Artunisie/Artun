package com.Martun.historyService.service;

import com.Martun.historyService.entity.CreateDemandeHistory;
import com.Martun.historyService.entity.DeleteDemandeHistory;
import com.Martun.historyService.repository.DeleteDemandeHistoryRepository;
import com.Martun.historyService.repository.DemandeHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DemandeHistoryService {
    private final DemandeHistoryRepository demandeHRepository;
    private final DeleteDemandeHistoryRepository deleteDemandeHRepository;
    private final HistoryService service;


    public String saveCreatedDemandeHistory(CreateDemandeHistory demandeHistory) {
        try {
            service.addHistory(demandeHistory);
            demandeHRepository.save(demandeHistory);
            return "Succès : L'historique de création de la demande a été sauvegardé.";
        } catch (Exception e) {
            return "Échec : Une erreur s'est produite lors de la sauvegarde de l'historique de la demande. " + e.getMessage();
        }
    }

    public String saveDeletedDemandeHistory(DeleteDemandeHistory demandeHistory) {
        try {
            service.addHistory(demandeHistory);
            deleteDemandeHRepository.save(demandeHistory);
            return "Succès : L'historique de supp de la demande a été sauvegardé.";
        } catch (Exception e) {
            return "Échec : Une erreur s'est produite lors de la sauvegarde de l'historique de la supp du demande. " + e.getMessage();
        }
    }
}
