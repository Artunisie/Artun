import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-popup',
  templateUrl: './chat-popup.component.html',
  styleUrls: ['./chat-popup.component.css']
})
export class ChatPopupComponent {
  // Ajoutez une propriété pour contrôler l'affichage du bouton
  showChatButton: boolean = true;

  // Fonction appelée lors du clic sur l'icône de fermeture
  closeChat() {
    this.showChatButton = false;
  }
}
