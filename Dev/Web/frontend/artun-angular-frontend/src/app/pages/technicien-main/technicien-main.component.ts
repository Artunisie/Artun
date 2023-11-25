import { Component,ElementRef,Renderer2, OnInit} from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';
import { HeaderComponent } from '../../components/header/header.component';
import { DemandeService } from 'src/app/services/demande.service';
@Component({
  selector: 'app-technicien-main',
  templateUrl: './technicien-main.component.html',
  styleUrls: ['./technicien-main.component.css'],

})
export class TechnicienMainComponent implements OnInit{
  someId: number = 1
  demandeList:any[]=[];

constructor(private elementRef: ElementRef ,private demandService: DemandeService) {}

  starRating = 0;
  startSalaryValue = 0;
  endSalaryValue = 1000;

startDistanceValue =0 ;
endDistanceValue = 100000 ;

ngOnInit() {
  this.getAllDemands();
}


SalaryFormatLabel(value:number):string{
  return `${value+"DT"}`
}


DistanceFormatLabel(value:number):string{
  return `${value+"kilometre"}`
}


getAllDemands() {
  this.demandService.getAllDemands().subscribe(
    (res) => {
      this.demandeList = res;
      console.log('All demands:', res);
    },
    (error) => {
      console.error('Error getting demands:', error);
    }
  );
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



