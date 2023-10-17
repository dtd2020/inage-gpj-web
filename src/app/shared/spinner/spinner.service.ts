import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private count = 0;
  private spinner$ = new BehaviorSubject<string>('');

  constructor() { }

  getSpinnerObserver(): Observable<string> {
    return this.spinner$.asObservable();
  }

  requestStarted(): void {
    
    if(++this.count === 1) {
      
      this.spinner$.next('start');
      
    }
  }

  requestEnded(): void {
    if(this.count === 0 || --this.count === 0) {
      this.spinner$.next('stop');
    }
  }

  resetSpinner(): void {
    this.count = 0;
    this.spinner$.next('stop');
  }
}
