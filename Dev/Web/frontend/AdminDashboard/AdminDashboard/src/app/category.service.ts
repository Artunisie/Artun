// src/app/category.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3003/categories/';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getCategoryById(categoryId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${categoryId}`);
  }
}
