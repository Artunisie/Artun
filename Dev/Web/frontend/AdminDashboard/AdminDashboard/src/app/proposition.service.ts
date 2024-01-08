import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandService {
  private apiUrl = 'http://localhost:8000'; // Replace with your actual backend URL
  constructor(private http: HttpClient) {}

  createDemand(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/demande`, data);
  }

  getDemand(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/demande/${id}`);
  }

  getAllDemands(): Observable<any> {
    return this.http.get(`${this.apiUrl}/demande`);
  }

  deleteDemand(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/demande/${id}`);
  }

  updateDemand(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/demande/${id}`, data);
  }

  acceptDemand(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/demande/accept/${id}`, null);
  }

  getAllDemandeByClientId(clientId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/demande/client/${clientId}`);
  }

  getFilteredData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/demande/filtered`, data);
  }

  getFilteredDataByUserId(id: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/demande/filtered/${id}`, data);
  }
}
