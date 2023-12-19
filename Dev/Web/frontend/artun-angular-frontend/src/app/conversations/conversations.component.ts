import { Component } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css']
})
export class ConversationsComponent {



  user:any ;




  constructor(  private websocketService:WebsocketService,private router: Router) {


   }

  ngOnInit(): void {



  }

  //make the search function that calls for the search function on the userService

}
