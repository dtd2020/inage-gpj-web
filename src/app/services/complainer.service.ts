import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComplainerModel, ComplainerPageModel } from 'app/models/complainer-model';
import { PageRequestModel } from 'app/models/pageable-meta-model';
import { ClientService } from 'app/security/services/client.service';
import { HttpParamsUtilService } from 'app/shared/utils/http-params-util.service';
import { isEmpty } from 'app/shared/utils/utils';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplainerService {

  private complainerContext: string = "/complainers";
  private url: string;

  constructor(private clientService: ClientService, private http: HttpClient, private httpParamsUtilService: HttpParamsUtilService) { }

  public findComplainerByUserId(userId: number) : Observable<ComplainerModel> {
    this.url = this.clientService.urlProcessingWS(`${this.complainerContext}/find-by-user-id/${userId}`);
    return this.http.get<ComplainerModel>(this.url);
  }

  public findComplainerById(complainerId: number) : Observable<ComplainerModel> {
    this.url = this.clientService.urlProcessingWS(`${this.complainerContext}/find-by-id/${complainerId}`);
    return this.http.get<ComplainerModel>(this.url);
  }

  public fetchAllComplainersPageable(pageRequest: PageRequestModel) : Observable<ComplainerPageModel> {
    let params = this.httpParamsUtilService.getPageRequestParams(pageRequest);
    this.url = this.clientService.urlProcessingWS(`${this.complainerContext}/fetch-all/pageable`);
    return this.http.get<ComplainerPageModel>(this.url, {params: params}).pipe(take(1));
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
