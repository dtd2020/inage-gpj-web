import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComplainerModel } from 'app/models/complainer-model';
import { ClientService } from 'app/security/services/client.service';
import { isEmpty } from 'app/shared/utils/utils';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplainerService {

  private complainerContext: string = "/complainers";
  private url: string;

  constructor(private clientService: ClientService, private http: HttpClient) { }

  public findComplainerByUserId(userId: number) : Observable<ComplainerModel> {
    this.url = this.clientService.urlProcessingWS(`${this.complainerContext}/find-by-user-id/${userId}`);
    return this.http.get<ComplainerModel>(this.url);
  }

  public findComplainerById(complainerId: number) : Observable<ComplainerModel> {
    this.url = this.clientService.urlProcessingWS(`${this.complainerContext}/find-by-id/${complainerId}`);
    return this.http.get<ComplainerModel>(this.url);
  }

  public fetchAllComplainers() : Observable<ComplainerModel[]> {
    this.url = this.clientService.urlProcessingWS(`${this.complainerContext}/fetch-all`);
    return this.http.get<ComplainerModel[]>(this.url);
  }

  public saveComplainer(complainer: ComplainerModel): Observable<ComplainerModel> {
    if(isEmpty(complainer?.id)) {
      return this.createComplainer(complainer);
    } else {
      return this.updateComplainer(complainer?.id, complainer);
    }
  }

  public createComplainer(complainer: ComplainerModel): Observable<ComplainerModel> {
    this.url = this.clientService.urlProcessingWS(`${this.complainerContext}/create/`);
    return this.http.post<ComplainerModel>(this.url, complainer);
  }

  public updateComplainer(complainerId: number, complainer: ComplainerModel): Observable<ComplainerModel> {
    this.url = this.clientService.urlProcessingWS(`${this.complainerContext}/update/${complainerId}`);
    return this.http.put<ComplainerModel>(this.url, complainer);
  }
}
