import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient,private keycloakService: KeycloakService) { }

  register(user: any): Observable<any> {
    return this.http.post('http://localhost:8089/api/v1/register', user);
  }

  getCurrentUser(): void {
    this.keycloakService.loadUserProfile()
      .then(userProfile => console.log(userProfile))
      .catch(error => console.log('Failed to load user profile', error));
  }
}
