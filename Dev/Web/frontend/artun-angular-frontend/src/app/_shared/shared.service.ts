import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private messageSource = new BehaviorSubject<string | null>(null);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeid(message: string) {
    this.messageSource.next(message);
  }
}
