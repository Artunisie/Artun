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

  createCategory(category: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, category);
  }

  deleteCategory(categoryId: string): Observable<any> {
    const url = `${this.apiUrl}${categoryId}`;
    return this.http.delete(url);
  }

  updateCategory(categoryId: string, updatedCategory: any): Observable<any> {
    const url = `${this.apiUrl}${categoryId}`;
    return this.http.put(url, updatedCategory);
  }

}
