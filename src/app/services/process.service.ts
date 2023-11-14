import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AttachmentFormDataRequest, AttachmentModel, AttachmentResponseModel } from 'app/models/attachment-model';
import { ProcessModel } from 'app/models/process-model';
import { ClientService } from 'app/security/services/client.service';
import { BehaviorSubject, take, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  private processContext: string = "/processes";
  private url: string;

  private step$ = new BehaviorSubject<string>('');
  public step = this.step$.asObservable();

  constructor(private http: HttpClient, private clientService: ClientService) { }

  public setStep(step: string) {
    this.step$.next(step);
  }

  public fetchAllProcesses() : Observable<ProcessModel[]> {
    this.url = this.clientService.urlProcessingWS(`${this.processContext}/fetch-all`);
    return this.http.get<ProcessModel[]>(this.url).pipe(take(1));
  }

  public fetchAllComplainerProcessesByUserId(userId: number) : Observable<ProcessModel[]> {
    this.url = this.clientService.urlProcessingWS(`${this.processContext}/fetch-all-by-user-id/${userId}/complainer`);
    return this.http.get<ProcessModel[]>(this.url).pipe(take(1));
  }

  public findAllProcessesToAllocate() : Observable<ProcessModel[]> {
    this.url = this.clientService.urlProcessingWS(`${this.processContext}/find-all-availabe-to-allocate`);
    return this.http.get<ProcessModel[]>(this.url).pipe(take(1));
  }
  
  public fetchAllAllocatedProcesses() : Observable<ProcessModel[]> {
    this.url = this.clientService.urlProcessingWS(`${this.processContext}/fetch-all-allocated`);
    return this.http.get<ProcessModel[]>(this.url).pipe(take(1));
  }

  // TODO: create a separate service that finds a process by id
  public fetchProcessById(processId: number): Observable<ProcessModel> {
    this.url = this.clientService.urlProcessingWS(`${this.processContext}/fetch-by-id/${processId}`);
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
    
    console.log("BATCUUU");
    
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
