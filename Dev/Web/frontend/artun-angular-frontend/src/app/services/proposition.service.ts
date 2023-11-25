import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PropositionService {

  private baseUrl = 'http://localhost:8000'; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  createProposition(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/proposition`, data);
  }

  getPropositionById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/proposition/${id}`);
  }

  getAllPropositionsForDemand(demandId: string | null): Observable<any> {
    return this.http.get(`${this.baseUrl}/proposition/demand/${demandId}`);
  }

  acceptProposition(propositionId: string ): Observable<any> {
    const url = `${this.baseUrl}/acceptProposition/${propositionId}`;
    return this.http.post(url, {});
  }

  refuseProposition(propositionId: string): Observable<any> {
    const url = `${this.baseUrl}/refuseProposition/${propositionId}`;
    return this.http.post(url, {});
  }

  updatePropositionPrice(id: string,coverLetter:String, proposedPrice: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/proposition/${id}`, {coverLetter, proposedPrice });
  }
}
