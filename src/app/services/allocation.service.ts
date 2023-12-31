import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BatchAllocationModel, AllocationResourceModel, SingleAllocationModel, AllocationModel, AllocationFollowUpRequestModel, AllocationPageModel } from 'app/models/allocation-model';
import { PageRequestModel } from 'app/models/pageable-meta-model';
import { ClientService } from 'app/security/services/client.service';
import { HttpParamsUtilService } from 'app/shared/utils/http-params-util.service';
import { isEmpty } from 'app/shared/utils/utils';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllocationService {

  private allocationContext: string = "/allocations";
  private url: string;

  constructor(private clientService: ClientService, private http: HttpClient, private httpParamsUtilService: HttpParamsUtilService) { }

  public fetchAllocationById(allocationId: number): Observable<AllocationModel> {
    this.url = this.clientService.urlProcessingWS(`${this.allocationContext}/fetch-by-id/${allocationId}`);
    return this.http.get<AllocationModel>(this.url).pipe(take(1));
  }

  public fetchAllocationByIdWithCommentHistory(allocationId: number, alertId?: number): Observable<AllocationModel> {
    console.log(allocationId);
    
    this.url = this.clientService.urlProcessingWS(`${this.allocationContext}/fetch-by-id/${allocationId}/with-comment-history`);
    if(!isEmpty(alertId)) {
      return this.http.get<AllocationModel>(this.url, {params: {alertId: alertId}}).pipe(take(1));
    }
    return this.http.get<AllocationModel>(this.url).pipe(take(1));
  }

  public fetchAllAllocationsPageable(pageRequest: PageRequestModel): Observable<AllocationPageModel> {
    let params = this.httpParamsUtilService.getPageRequestParams(pageRequest);
    this.url = this.clientService.urlProcessingWS(`${this.allocationContext}/fetch-all/pageable`);
    return this.http.get<AllocationPageModel>(this.url, {params: params}).pipe(take(1));
  }

  public findAllocationResourcesPageable(pageRequest: PageRequestModel): Observable<AllocationResourceModel> {
    let params = this.httpParamsUtilService.getPageRequestParams(pageRequest);
    this.url = this.clientService.urlProcessingWS(`${this.allocationContext}/resources/pageable`);
    return this.http.get<AllocationResourceModel>(this.url, {params: params}).pipe(take(1));
  }


  public fetchAllMyAllocationsPageable(userId: number, pageRequest: PageRequestModel): Observable<AllocationPageModel> {
    let params = this.httpParamsUtilService.getPageRequestParams(pageRequest);
    this.url = this.clientService.urlProcessingWS(`${this.allocationContext}/fetch-all-by-staff/${userId}/pageable`);
    return this.http.get<AllocationPageModel>(this.url, {params: params}).pipe(take(1));
  }

  public singleAllocateProcess(singleAllocationRequestData: SingleAllocationModel): Observable<void> {
    this.url = this.clientService.urlProcessingWS(`${this.allocationContext}/single-allocate`);
    return this.http.post<void>(this.url, singleAllocationRequestData).pipe(take(1));
  }

  public batchAllocateProcess(bacthAllocationRequestData: BatchAllocationModel): Observable<void> {
    this.url = this.clientService.urlProcessingWS(`${this.allocationContext}/batch-allocate`);
    return this.http.post<void>(this.url, bacthAllocationRequestData).pipe(take(1));
  }

  public allocationFollowUp(allocationFollowUpRequestData: AllocationFollowUpRequestModel): Observable<void> {
    this.url = this.clientService.urlProcessingWS(`${this.allocationContext}/follow-up-allocation`);
    return this.http.post<void>(this.url, allocationFollowUpRequestData).pipe(take(1));
  }
}
