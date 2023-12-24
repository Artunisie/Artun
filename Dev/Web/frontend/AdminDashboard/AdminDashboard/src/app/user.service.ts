// src/app/user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getUserById(userId: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get(url);
  }

  blockUser(userId: string): Observable<any> {
    const url = `${this.apiUrl}/block-user/${userId}`;
    return this.http.put(url, {});
  }

  unblockUser(userId: string): Observable<any> {
    const url = `${this.apiUrl}/unblock-user/${userId}`;
    return this.http.put(url, {});
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user);
  }

}
