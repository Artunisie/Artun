import { Component, OnInit } from '@angular/core';
import { PropositionService } from '../../services/proposition.service';
import { DemandeService } from '../../services/demande.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-demande-client',
  templateUrl: './demande-client.component.html',
  styleUrls: ['./demande-client.component.css']
})
export class DemandeClientComponent implements OnInit {

demande:any ;
propositions:any ;

  constructor(private route: ActivatedRoute ,private demandeService :DemandeService , private propositionService:PropositionService){}

  ngOnInit(): void {
    const demandId = this.route.snapshot.paramMap.get('id');
     this.getDemandeById(demandId)
     this.getPropositionsById(demandId)
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



  Chat() {
    throw new Error('Method not implemented.');
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
