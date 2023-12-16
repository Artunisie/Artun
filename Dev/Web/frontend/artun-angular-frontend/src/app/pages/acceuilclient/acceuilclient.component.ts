import { Component,ElementRef,Renderer2, OnInit } from '@angular/core';
import { DemandeService } from 'src/app/services/demande.service';
import { KeycloakService } from 'keycloak-angular';
@Component({
  selector: 'app-acceuilclient',
  templateUrl: './acceuilclient.component.html',
  styleUrls: ['./acceuilclient.component.css']
})
export class AcceuilclientComponent implements OnInit{

  yourIdVariable: number = 1
  demandeList:any[]=[];
  userDetails:any  ;

constructor(private keycloakService: KeycloakService, private demandService: DemandeService,private elementRef: ElementRef) {}

  starRating = 0;
  startSalaryValue = 0;
  endSalaryValue = 1000;



urgentCheckbox: boolean= true ;
nonUrgentCheckbox: boolean=true ;
plumbingCheckbox: boolean=true;
mechanicalCheckbox: boolean=true;
PaintingCheckbox: boolean=true;
othersCheckbox: boolean=true;
CleaningCheckbox: boolean = true;

ngOnInit() {
  this.keycloakService.loadUserProfile(true).then((user:any)=>{
    this.userDetails = user ;
    console.log("userDetails",this.userDetails) ;
  }).then(()=>{
    this.getAllDemandsbyUserId();})

}


SalaryFormatLabel(value:number):string{
  return `${value+"DT"}`
}


DistanceFormatLabel(value:number):string{
  return `${value+"kilometre"}`
}


getAllDemandsbyUserId() {
  console.log("user id " ,this.userDetails.id)
  this.demandService.getAllDemandeByClientId(this.userDetails.id).subscribe(
    (res) => {
      this.demandeList = res;
      console.log('All demands:', res);

    },
    (error) => {
      console.error('Error getting demands:', error);
    }
  );
}

onDelete(id:any) {
this.demandService.deleteDemand(id).subscribe(
  (res) => {
    console.log('Deleterd demande:', res);
    this.demandeList = this.demandeList.filter(demand => demand.id !== id);
  },
  (error) => {
    console.error('Error deleting demande:', error);
  }
)
  }


toggleChat() {
  const chatPopup: HTMLElement = this.elementRef.nativeElement.querySelector('#chatPopup');
  chatPopup.style.display = (chatPopup.style.display === 'block') ? 'none' : 'block';
}

removeChat() {
  var chatContainer = document.getElementById('chatPopup');
  chatContainer?.parentNode?.removeChild(chatContainer);
  var chatButton = document.getElementById('chatButton') ;
  chatButton?.parentNode?.removeChild(chatButton);
}



submitFilter() {
  // Assuming you have a method in your service like getFilteredData
  this.demandService.getFilteredDataByUserId(this.userDetails.id ,{
    startSalary: this.startSalaryValue,
    endSalary: this.endSalaryValue,
    urgent: this.urgentCheckbox,
    nonUrgent: this.nonUrgentCheckbox,
    plumbing: this.plumbingCheckbox,
    mechanical: this.mechanicalCheckbox,
    Painting: this.PaintingCheckbox,
    Cleanign:this.CleaningCheckbox,
    others: this.othersCheckbox,
  }).subscribe(
    (filteredData: any[]) => {
      // Handle the result from the service
      this.demandeList = filteredData;
    },
    (error) => {
      // Handle error if necessary
      console.error('Error fetching filtered data', error);
    }
  );
}

}



