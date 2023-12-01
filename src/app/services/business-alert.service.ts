import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusinessAlertModel } from 'app/models/business-alert-model';
import { ClientService } from 'app/security/services/client.service';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessAlertService {

  private processAlertContext: string = "/alert";
  private url: string;

  constructor(private clientService: ClientService, private http: HttpClient) { }


  public findAllUnreadAlertsByUserId(userId: number): Observable<BusinessAlertModel[]> {
    this.url = this.clientService.urlProcessingWS(`${this.processAlertContext}/find-all-unread-by-user-id/${userId}`);
    return this.http.get<BusinessAlertModel[]>(this.url).pipe(take(1));
  }

  public markAsRead(alertId: number): Observable<BusinessAlertModel> {
    this.url = this.clientService.urlProcessingWS(`${this.processAlertContext}/mark-as-read/${alertId}`);
    return this.http.post<BusinessAlertModel>(this.url, null).pipe(take(1));
  }
}
