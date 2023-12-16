import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const ipAdress = environment.ipAdress ;
const protocal = environment.protocol ;
@Injectable({
  providedIn: 'root',
})


export class ConversationService {


  apiUrl:string  = `${protocal}://${ipAdress}:8081/conversations/` ;
  constructor(private http: HttpClient) { }


  createConversation(userId :number, proposition_user_id:number){
    console.log(userId , proposition_user_id);
    return this.http.post(this.apiUrl+"createConversation" , {userId, proposition_user_id} ,{responseType:'text'} ) ;
  }


  getConversations(id:number) {
    return this.http.get(this.apiUrl +"getAll"+"/"+id  , httpOptions);
  }

  getLastMessageInConversation(conversationId:number){
    return this.http.get(this.apiUrl+"getLastMessage/"+conversationId , httpOptions) ;
  }


GetConversation(conversationId:number){
  return this.http.get(this.apiUrl+"getConversation/"+conversationId,httpOptions) ;
}

  getConversationMessages(conversationId:number){
    return this.http.get(this.apiUrl+"getConversationMessages/"+conversationId,httpOptions) ;
  }


  sendMessage(message: string, conversationId: number, senderId: number, files?: FileList): Observable<any> {
    const formData = new FormData();
    formData.append('content', message);
    formData.append('conversationId', conversationId.toString());
    formData.append('senderId', senderId.toString());

    // Append files to the FormData if provided
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (file) {
          formData.append(`files`, file, file.name);
        }
      }
    }
    return this.http.post(`${this.apiUrl}sendMessage`, formData);
  }




}
