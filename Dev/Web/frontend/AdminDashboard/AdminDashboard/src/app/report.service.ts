// report.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:3004/reports';  // Replace with your actual API endpoint

  constructor(private httpClient: HttpClient) { }

  getReports(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl);
  }
}
