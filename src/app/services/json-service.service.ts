import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserJsonServer } from 'app/models/json-server/json-server';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonServiceService {

  private readonly base_url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<UserJsonServer> {
    return this.http.get<UserJsonServer>(this.base_url + '/users').pipe(take(1));
  }
}
