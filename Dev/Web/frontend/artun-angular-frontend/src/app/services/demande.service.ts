import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private baseUrl = 'http://localhost:8000'; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  createDemand(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/demande`, data);
  }

  getDemandById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/demande/${id}`);
  }

  getAllDemandeByClientId(id:any): Observable<any> {
    return this.http.get(`${this.baseUrl}/demande/client/${id}`);
  }

  getAllDemands(): Observable<any> {
    return this.http.get(`${this.baseUrl}/demande`);
  }

  deleteDemand(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/demande/${id}`);
  }

  updateDemand(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/demande/${id}`, data);
  }


  getFilteredData(filters: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/demande/filtered`, filters);
  }
}
