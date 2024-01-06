import { Component, OnInit } from '@angular/core';
import { DemandService } from '../demand.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  recentDemands: any[] = [];

  constructor(private demandService: DemandService) {}

  ngOnInit(): void {
    this.loadRecentDemands();
  }

  loadRecentDemands(): void {
    this.demandService.getAllDemands().subscribe(
      (data) => {
        this.recentDemands = data;
      },
      (error) => {
        console.error('Error fetching recent demands', error);
      }
    );
  }
}
