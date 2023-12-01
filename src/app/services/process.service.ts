import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AttachmentFormDataRequest, AttachmentModel, AttachmentResponseModel } from 'app/models/attachment-model';
import { PageRequestModel } from 'app/models/pageable-meta-model';
import { ProcessModel, ProcessPageModel } from 'app/models/process-model';
import { ClientService } from 'app/security/services/client.service';
import { HttpParamsUtilService } from 'app/shared/utils/http-params-util.service';
import { isEmpty } from 'app/shared/utils/utils';
import { BehaviorSubject, take, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  private processContext: string = "/processes";
  private url: string;

  private step$ = new BehaviorSubject<string>('');
  public step = this.step$.asObservable();

  constructor(private http: HttpClient, private clientService: ClientService, private httpParamsUtilService: HttpParamsUtilService) { }

  public setStep(step: string) {
    this.step$.next(step);
  }

  public fetchAllProcesses() : Observable<ProcessModel[]> {
    this.url = this.clientService.urlProcessingWS(`${this.processContext}/fetch-all`);
    return this.http.get<ProcessModel[]>(this.url).pipe(take(1));
  }
  
  
  public fetchAllProcessesPageable(pageRequest: PageRequestModel) : Observable<ProcessPageModel> {
    let params = this.httpParamsUtilService.getPageRequestParams(pageRequest);
    this.url = this.clientService.urlProcessingWS(`${this.processContext}/fetch-all/pageable`);
    return this.http.get<ProcessPageModel>(this.url, {params: params}).pipe(take(1));
  }

  public fetchAllComplainerProcessesByUserIdPageable(userId: number, pageRequest: PageRequestModel) : Observable<ProcessPageModel>{
    let params = this.httpParamsUtilService.getPageRequestParams(pageRequest);
    this.url = this.clientService.urlProcessingWS(`${this.processContext}/fetch-all-by-user-id/${userId}/complainer/pageable`);
    return this.http.get<ProcessPageModel>(this.url, {params: params}).pipe(take(1));
  }

  public findAllProcessesToAllocatePageable(pageRequest: PageRequestModel) : Observable<ProcessPageModel>{
    let params = this.httpParamsUtilService.getPageRequestParams(pageRequest);
    this.url = this.clientService.urlProcessingWS(`${this.processContext}/find-all-availabe-to-allocate/pageable`);
    return this.http.get<ProcessPageModel>(this.url, {params: params}).pipe(take(1));
  }
  
  public fetchAllAllocatedProcesses() : Observable<ProcessModel[]> {
    this.url = this.clientService.urlProcessingWS(`${this.processContext}/fetch-all-allocated`);
    return this.http.get<ProcessModel[]>(this.url).pipe(take(1));
  }
  
  public fetchAllAllocatedProcessesPageable(pageRequest: PageRequestModel) : Observable<ProcessPageModel> {
    let params = this.httpParamsUtilService.getPageRequestParams(pageRequest);
    this.url = this.clientService.urlProcessingWS(`${this.processContext}/fetch-all-allocated/pageable`);    
    return this.http.get<ProcessPageModel>(this.url, {params: params}).pipe(take(1));
  }

  // TODO: create a separate service that finds a process by id
  public fetchProcessById(processId: number, alertId?: number): Observable<ProcessModel> {    
    this.url = this.clientService.urlProcessingWS(`${this.processContext}/fetch-by-id/${processId}`);
    if(!isEmpty(alertId)) {
      return this.http.get<ProcessModel>(this.url, {params: {alertId: alertId}}).pipe(take(1));
    }
    return this.http.get<ProcessModel>(this.url).pipe(take(1));
  }

  public saveProcesses(processe: ProcessModel):Observable<ProcessModel> {
    if(processe?.id) {
      return this.updateProcess(processe);
    } else {
      return this.createProcess(processe);
    }
  }

  public createProcess(process: ProcessModel): Observable<ProcessModel> {
    this.url = this.clientService.urlProcessingWS(`${this.processContext}/submit`);
    return this.http.post<ProcessModel>(this.url, process).pipe(take(1));
  }

  public updateProcess(process: ProcessModel): Observable<ProcessModel> {
    this.url = this.clientService.urlProcessingWS(`${this.processContext}/update/${process?.id}`);
    return this.http.put<ProcessModel>(this.url, process).pipe(take(1));
  }

  // TODO: create a separate service that removes the process
  public deleteProcess(processId: number): Observable<void> {
    this.url = this.clientService.urlProcessingWS(`${this.processContext}/delete/${processId}`);
    return this.http.delete<void>(this.url).pipe(take(1));
  }

  public createProcessSingleAttachment(attachment : AttachmentModel, processId: number) : Observable<AttachmentResponseModel> {

    this.url = this.clientService.urlProcessingWS(`${this.processContext}/attachment/single-upload`);
    let formData : FormData = new FormData();

    formData.append('file', attachment?.file);
    formData.append('processId', attachment?.processId?.toString());
    formData.append('fileName', attachment?.fileName);

    return this.http.post<AttachmentResponseModel>(this.url, formData).pipe(take(1));
  }


  public createProcessBatchAttachment(attachments : AttachmentModel[], processId: number) : Observable<void> {

    this.url = this.clientService.urlProcessingWS(`${this.processContext}/attachment/batch-upload`);
    let formData : FormData = new FormData();

    attachments.forEach(attachment => {
      formData.append('files', attachment?.file);
      formData.append('names', attachment?.fileName);
    })
    formData.append('processId', processId.toString());
    
    return this.http.post<void>(this.url, formData).pipe(take(1));
  }

  


  // public uploadAttachment(attachment: AttachmentModel) : Observable<AttachmentResponseModel> {

  //   let formData : FormData = new FormData();
  //   formData.append('file', attachment?.file);
  //   formData.append('processId', attachment?.processId?.toString());
  //   formData.append('fileName', attachment?.fileName);

  //   this.url = this.clientService.urlProcessingWS(`${this.processContext}/attachment/upload`);


    
  //   return this.http.post<AttachmentResponseModel>(this.url, formData).pipe(take(1));
  // }

  
}
