import { Component,ElementRef,Renderer2, OnInit } from '@angular/core';
import { DemandeService } from 'src/app/services/demande.service';

@Component({
  selector: 'app-acceuilclient',
  templateUrl: './acceuilclient.component.html',
  styleUrls: ['./acceuilclient.component.css']
})
export class AcceuilclientComponent implements OnInit{
submitFilter() {
throw new Error('Method not implemented.');
}
  userId:number = 1
  yourIdVariable: number = 1
  demandeList:any[]=[];

constructor(private demandService: DemandeService,private elementRef: ElementRef) {}

  starRating = 0;
  startSalaryValue = 0;
  endSalaryValue = 1000;

startDistanceValue =0 ;
endDistanceValue = 100000 ;

ngOnInit() {
   this.getAllDemandsbyUserId();
}


SalaryFormatLabel(value:number):string{
  return `${value+"DT"}`
}


DistanceFormatLabel(value:number):string{
  return `${value+"kilometre"}`
}


getAllDemandsbyUserId() {
  this.demandService.getAllDemandeByClientId(this.userId).subscribe(
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
    this.demandeList = res;
    console.log('Deleterd demande:', res);
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

}



