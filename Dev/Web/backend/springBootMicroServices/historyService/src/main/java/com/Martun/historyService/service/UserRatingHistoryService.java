package com.Martun.historyService.service;

import com.Martun.historyService.entity.UserRatingHistory;
import com.Martun.historyService.exceptions.HistoryNotFoundException;
import com.Martun.historyService.repository.UserRatingHistoryRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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

    public UserRatingHistory updateRatingHistory(Long ratingHistoryId, UserRatingHistory newRatingHistory) throws HistoryNotFoundException {
        Optional<UserRatingHistory> optionalUserRatingHistory = ratingHistoryRepo.findById(ratingHistoryId);

        if (optionalUserRatingHistory.isPresent()) {

            UserRatingHistory userRatingHistory = optionalUserRatingHistory.get();

            LocalDateTime now = LocalDateTime.now();
            userRatingHistory.setComment(newRatingHistory.getComment());
            userRatingHistory.setNombreEtoilesDonner(newRatingHistory.getNombreEtoilesDonner());
            userRatingHistory.setHistoryDate(now);

            return ratingHistoryRepo.save(userRatingHistory);
        } else {
            throw new HistoryNotFoundException("Aucun historique de notation trouvé avec l'ID : " + ratingHistoryId);
        }
    }


    public UserRatingHistory getUserReatedAlreadyData(Long userId, Long ratedUserId) throws HistoryNotFoundException {
        UserRatingHistory ratingEntity = ratingHistoryRepo.findUserRatingHistoryByUserIdAndRatedUserId(userId, ratedUserId);
        if(ratingEntity != null){
            log.info(String.valueOf(ratingEntity.getId()));
            log.info(String.valueOf(ratingEntity.getUserId()));
            log.info(String.valueOf(ratingEntity.getRatedUserId()));
            log.info(ratingEntity.getComment());
            log.info(String.valueOf(ratingEntity.getNombreEtoilesDonner()));
            return ratingEntity;
        }
        else {
             throw new HistoryNotFoundException("not found");
        }

    }


}
