import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/services/websocket.service';
import { ConversationService } from 'src/app/services/conversation.service';
import { Stomp } from '@stomp/stompjs';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/_shared/shared.service';
import { KeycloakService } from 'keycloak-angular';
@Component({
  selector: 'app-sidebar',
  templateUrl: './chat-sideBar.component.html',
  styleUrls: ['./chat-sideBar.component.css']
})
export class ChatSideBarComponent implements OnInit {
  currentUser: any={};
  conversations :any = [];
  currentId:any  ;
  constructor(private keycloakService:KeycloakService , private sharedService:SharedService , private route:ActivatedRoute ,private router: Router ,private websocketService:WebsocketService ,private conversationService: ConversationService ) { }

  ngOnInit(): void {
    this.keycloakService.loadUserProfile(true).then((user:any)=>{
      this.currentUser = user ;
      console.log("userDetails",this.currentUser) ;
    }).then(()=>{
      this.conversationService.getConversations(this.currentUser.id).subscribe({
        next: data => {
          console.log(data) ;
          this.createConversationList(data) ;

        },
        error: err => {
          console.error(err) ;
        }
      })
    })

    this.sharedService.currentMessage.subscribe((message:any) => {console.log(message)
    this.currentId = message ;
    });
    // Initialize the current user


    this.websocketService.stompClient.connect({}, (frame: string) => {
      console.log('Connected: ' + frame);
    this.websocketService.subToUser(this.currentUser.id).subscribe({
      next: data =>{
        console.log(data)
        this.conversationService.getConversations(this.currentUser.id).subscribe({
          next: data => {
            console.log(data) ;
            this.createConversationList(data) ; }});

      } ,
      error: err =>{
        console.error(err) ;
      }
    })
  });

  }



  createConversationList(data:any){
    this.conversations=[] ;
    data.forEach((element: any) => {
      let conversation: any = {}; // Create a new conversation object inside the loop

      if (element.users.length == 2) {
        element.users.forEach((user: any) => {
          if (user.userId != this.currentUser.id) {
            conversation.name = user.firstName;
          }
        });
      }

      conversation.lastMessage = "";
      conversation.id = element.id;

      this.conversationService.getLastMessageInConversation(element.id).subscribe({
        next: (data:any) => {
          conversation.lastMessage = data;
        },
        error: (err:any) => {
          console.error(err);
        }
      });

      this.conversations.push(conversation);
    });


  }

  isConversationActive(element:any) {

    return this.currentId == element.id.toString();
  }

  showConversation(element:any)
  {

      this.router.navigate(['/mainPage/messages', element.id]);
    }


  }
