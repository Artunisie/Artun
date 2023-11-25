import { Component ,ElementRef , Input} from '@angular/core';

@Component({
  selector: 'app-chat-popup',
  templateUrl: './chat-popup.component.html',
  styleUrls: ['./chat-popup.component.css']
})
export class ChatPopupComponent {

@Input() id!:number ;


  constructor(private elementRef: ElementRef) {}

  toggleChat(id:number) {
    const chatPopup: HTMLElement = this.elementRef.nativeElement.querySelector(`#chatPopup${id}`);
    chatPopup.style.display = (chatPopup.style.display === 'block') ? 'none' : 'block';
  }

  removeChat(id:number) {
    var chatContainer = document.getElementById(`chatPopup${id}`);
    chatContainer?.parentNode?.removeChild(chatContainer);
    var chatButton = document.getElementById(`chatButton${id}`);
    chatButton?.parentNode?.removeChild(chatButton);
  }

}
