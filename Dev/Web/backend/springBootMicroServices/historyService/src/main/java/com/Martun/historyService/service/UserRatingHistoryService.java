package com.Martun.historyService.service;

import com.Martun.historyService.entity.UserRatingHistory;
import com.Martun.historyService.exceptions.HistoryNotFoundException;
import com.Martun.historyService.repository.UserRatingHistoryRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserRatingHistoryService {
    private final HistoryService service;
    private final UserRatingHistoryRepo ratingHistoryRepo;


    public String saveRatingHistory(UserRatingHistory ratingHistory) {
        try {
            service.addHistory(ratingHistory);
            ratingHistoryRepo.save(ratingHistory);
            return "Succès : L'historique de notation de l'utilisateur a été sauvegardé.";
        } catch (Exception e) {
            return "Échec : Une erreur s'est produite lors de la sauvegarde de l'historique de notation de l'utilisateur. " + e.getMessage();
        }
    }
    public UserRatingHistory ifUserReatedAlready(Long userId, Long ratedUserId) throws HistoryNotFoundException{
        UserRatingHistory ratingHistory = ratingHistoryRepo.findUserRatingHistoryByUserIdAndRatedUserId(userId, ratedUserId);
        if(ratingHistory != null){
            log.info(String.valueOf(ratingHistory.getRatedUserId()));
            log.info(String.valueOf(ratingHistory.getUserId()));
            log.info(ratingHistory.getComment());
            log.info(String.valueOf(ratingHistory.getNombreEtoilesDonner()));
            return ratingHistory;
        }
        else {
            // Achanger le message d'erreur
             throw new HistoryNotFoundException("Rating user not found");
        }

    }

}
