import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllocationBatchModel, AllocationResourceModel } from 'app/models/allocation-model';
import { ClientService } from 'app/security/services/client.service';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllocationService {

  private allocationContext: string = "/allocations";
  private url: string;

  constructor(private clientService: ClientService, private hhtp: HttpClient) { }

  public findAllocationResources(): Observable<AllocationResourceModel> {
    this.url = this.clientService.urlProcessingWS(`${this.allocationContext}/resources`);
    return this.hhtp.get<AllocationResourceModel>(this.url).pipe(take(1));
  }

  public batchAllocateProcess(bacthAllocationRequestData: AllocationBatchModel) : Observable<void> {
    this.url = this.clientService.urlProcessingWS(`${this.allocationContext}/batch-allocate`);
    return this.hhtp.post<void>(this.url, bacthAllocationRequestData).pipe(take(1));
  }
}
