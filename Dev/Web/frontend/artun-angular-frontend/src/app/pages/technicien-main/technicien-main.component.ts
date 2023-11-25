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

  urgentCheckbox: boolean= true ;
  nonUrgentCheckbox: boolean=true ;
  plumbingCheckbox: boolean=true;
  mechanicalCheckbox: boolean=true;
  PaintingCheckbox: boolean=true;
  othersCheckbox: boolean=true;
  CleaningCheckbox: boolean = true;


  someId: number = 1
  demandeList:any[]=[];



constructor(private elementRef: ElementRef ,private demandService: DemandeService) {}

  starRating = 0;
  startSalaryValue = 0;
  endSalaryValue = 100000;

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



submitFilter() {
  // Assuming you have a method in your service like getFilteredData
  this.demandService.getFilteredData({
    startSalary: this.startSalaryValue,
    endSalary: this.endSalaryValue,
    startDistance: this.startDistanceValue,
    endDistance: this.endDistanceValue,
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



