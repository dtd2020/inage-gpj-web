import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BatchAllocationModel, AllocationResourceModel, SingleAllocationModel, AllocationModel, AllocationFollowUpRequestModel } from 'app/models/allocation-model';
import { ClientService } from 'app/security/services/client.service';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllocationService {

  private allocationContext: string = "/allocations";
  private url: string;

  constructor(private clientService: ClientService, private hhtp: HttpClient) { }

  public fetchAllocationById(allocationId: number) : Observable<AllocationModel> {
    this.url = this.clientService.urlProcessingWS(`${this.allocationContext}/fetch-by-id/${allocationId}`);
    return this.hhtp.get<AllocationModel>(this.url).pipe(take(1));
  }
  
  public fetchAllAllocations() : Observable<AllocationModel[]> {
    this.url = this.clientService.urlProcessingWS(`${this.allocationContext}/fetch-all`);
    return this.hhtp.get<AllocationModel[]>(this.url).pipe(take(1));
  }

  public findAllocationResources(): Observable<AllocationResourceModel> {
    this.url = this.clientService.urlProcessingWS(`${this.allocationContext}/resources`);
    return this.hhtp.get<AllocationResourceModel>(this.url).pipe(take(1));
  }
  
  public fetchAllMyAllocations(userId: number): Observable<AllocationModel[]> {
    this.url = this.clientService.urlProcessingWS(`${this.allocationContext}/fetch-all-by-staff/${userId}`);
    return this.hhtp.get<AllocationModel[]>(this.url).pipe(take(1));
  }

  public singleAllocateProcess(singleAllocationRequestData: SingleAllocationModel) : Observable<void> {
    this.url = this.clientService.urlProcessingWS(`${this.allocationContext}/single-allocate`);
    return this.hhtp.post<void>(this.url, singleAllocationRequestData).pipe(take(1));
  }

  public batchAllocateProcess(bacthAllocationRequestData: BatchAllocationModel) : Observable<void> {
    this.url = this.clientService.urlProcessingWS(`${this.allocationContext}/batch-allocate`);
    return this.hhtp.post<void>(this.url, bacthAllocationRequestData).pipe(take(1));
  }

  public allocationFollowUp(allocationFollowUpRequestData: AllocationFollowUpRequestModel) : Observable<void> {
    this.url = this.clientService.urlProcessingWS(`${this.allocationContext}/follow-up-allocation`);
    return this.hhtp.post<void>(this.url, allocationFollowUpRequestData).pipe(take(1));
  }
}
