// report.component.ts

import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-report',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reports: any[] = [];

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.fetchReports();
  }

  fetchReports() {
    this.reportService.getReports()
      .subscribe(reports => {
        this.reports = reports;
      });
  }
}
