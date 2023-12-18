import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const ipAdress = environment.ipAdress ;
const protocal = environment.protocol ;
@Injectable({
  providedIn: 'root'
})

export class WebsocketService {
  stompClient : any;
  newmessage: string | undefined;
  greetings: string[] = [];  disabled = true;
socket  = new SockJS(`${protocal}://${ipAdress}:8081/testchat`) ;
  constructor() {
  this.stompClient = Stomp.over(this.socket);
  const _this = this;
}

  public UpdateConversation(conversationId : number  ): void {
    console.log(conversationId);
    console.log("conversation stuff");

      this.stompClient.send(`/current/conversation/${conversationId}`, { },JSON.stringify({}));

  }

  public UpdateUser(UserId : number  ): void {
 console.log(UserId);

      this.stompClient.send(`/current/user/${UserId}`, { },JSON.stringify({}));

  }

//pushes the message to the greeting array wich is then used to display the whole array


  connect() {
    const socket = new SockJS(`${protocal}://${ipAdress}:8081/testchat`);
  this.stompClient = Stomp.over(socket);
  const _this = this;
  this.stompClient.connect({}, function (frame: string) {
    console.log('Connected: ' + frame);

 });
}

subToConversation(conversationId:number):Observable<any>{
  return new Observable(observer => {
    this.stompClient.subscribe(`/start/conversation/${conversationId}`, (response: any) => {
      console.log("got the convo mate");
      observer.next(response); // Emit the response to the new Observable
    });
  });
}



// subToUser(userId: number): Observable<any> {
//   return new Observable(observer => {
//     this.stompClient.subscribe(`/start/initial/${userId}`, (response: any) => {
//       console.log("got the user mate ");
//       observer.next(response); // Emit the response to the new Observable
//     });
//   });
// }

_disconnect(){
  if (this.stompClient !== null) {
    this.stompClient.disconnect();
}
console.log("Disconnected");
}



}
