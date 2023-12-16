import { Component, OnInit } from '@angular/core';
import { PropositionService } from '../../services/proposition.service';
import { DemandeService } from '../../services/demande.service';
import { ActivatedRoute } from '@angular/router';
import { ConversationService } from 'src/app/services/conversation.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { KeycloakService } from 'keycloak-angular';
@Component({
  selector: 'app-demande-client',
  templateUrl: './demande-client.component.html',
  styleUrls: ['./demande-client.component.css']
})
export class DemandeClientComponent implements OnInit {
userDetails :any ;
demande:any ;
propositions:any ;

  constructor( private keycloakService:KeycloakService,private websocketService:WebsocketService , private conversationService: ConversationService ,  private route: ActivatedRoute ,private demandeService :DemandeService , private propositionService:PropositionService){}

  ngOnInit(): void {

    console.log("on init");

    this.keycloakService.loadUserProfile(true).then((user:any)=>{
      this.userDetails = user ;
      console.log("userDetails",this.userDetails) ;
    }).then(()=>{
      const demandId = this.route.snapshot.paramMap.get('id');
      this.getDemandeById(demandId)
      this.getPropositionsById(demandId)
    })

 }

getPropositionsById(demandId:any){
  this.propositionService.getAllPropositionsForDemand(demandId).subscribe(
    (res) => {
      this.propositions = res;
      console.log('propositon details:', res);
    },
    (error) => {
      console.error('Error getting propositions :', error);
    }
  );
}


  getDemandeById(demandId:any){

    this.demandeService.getDemandById(demandId).subscribe(
      (res) => {
        this.demande = res;
        console.log('Demand details:', res);
      },
      (error) => {
        console.error('Error getting demand details:', error);
      }
    );

  }



  Chat(proposition_userID:number) {
console.log("prop id :",proposition_userID);
console.log("userid",this.userDetails.id);

this.conversationService.createConversation(this.userDetails.id ,proposition_userID ).subscribe(
  (res)=>{
    console.log('creation Conversation:', res);
    this.websocketService.UpdateUser(proposition_userID)  ;

  },
  (error)=>{
console.log("erreur creation erreur:", error) ;
  })

    }


    refuse(propositonId:any) {
  this.propositionService.refuseProposition(propositonId).subscribe(
    (res) => {
      console.log('refusal done:', res);
      const demandId = this.route.snapshot.paramMap.get('id');
      this.getDemandeById(demandId)
      this.getPropositionsById(demandId)
    },
    (error) => {
      console.error('Error refusing the proposition:', error);
    }
  );
    }

    Accept(propositonId:any) {
      this.propositionService.acceptProposition(propositonId).subscribe(
        (res) => {
          console.log('acceptation done:', res);
          const demandId = this.route.snapshot.paramMap.get('id');
          this.getDemandeById(demandId)
          this.getPropositionsById(demandId)
        },
        (error) => {
          console.error('Error accepting the proposition:', error);
        })
      } ;


}
