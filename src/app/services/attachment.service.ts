import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AttachmentModel, AttachmentResponseModel } from 'app/models/attachment-model';
import { ClientService } from 'app/security/services/client.service';
import { SecurityService } from 'app/security/services/security.service';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  private attachmnetContext: string = "/attachments";
  private processContext: string = "/processes";
  private url: string;

  constructor(private clientService: ClientService, private securityService: SecurityService, private http: HttpClient) { }

  // public uploadAttachment(attachment: AttachmentModel) : Observable<AttachmentResponseModel> {
  // // public uploadAttachment(attachment: AttachmentModel) : Observable<HttpEvent<AttachmentResponseModel>> {
  //   this.url = this.clientService.urlProcessingWS(`${this.attachmnetContext}/upload`);
  //   // const xhr = new XMLHttpRequest();
  //   // const formData: FormData = new FormData();

  //   // formData.append('file', attachment.file);
  //   // formData.append('file', attachment.file);

  //   // xhr.open('POST', this.url, true); 
  //   // xhr.setRequestHeader('Accept', 'multipart/form-data')
  //   // xhr.setRequestHeader('Authorization', `Bearer ${this.securityService.getToken()}`)
  //   // xhr.send(formData);

  //   // const req = new HttpRequest('POST', `${this.url}`, formData, {
  //   //   reportProgress: true,
  //   //   responseType: 'json'
  //   // });

  //   // return this.http.request(req);


    
  //   return this.http.post<AttachmentResponseModel>(this.url, attachment).pipe(take(1));
  // }


  public uploadAttachment(attachment: AttachmentModel) : Observable<AttachmentResponseModel> {

      let formData : FormData = new FormData();
      formData.append('file', attachment?.file);
      formData.append('processId', attachment?.processId?.toString());
      formData.append('givenFileName', attachment?.givenFileName);

      this.url = this.clientService.urlProcessingWS(`${this.processContext}/attachment/upload`);
  
  
      
      return this.http.post<AttachmentResponseModel>(this.url, formData).pipe(take(1));
    }
}
