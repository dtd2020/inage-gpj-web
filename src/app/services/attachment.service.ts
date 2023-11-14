import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AttachmentModel, AttachmentResponseModel } from 'app/models/attachment-model';
import { ClientService } from 'app/security/services/client.service';
import { SecurityService } from 'app/security/services/security.service';
import { Observable, take } from 'rxjs';
import { UploadDownloadService } from './upload-download.service';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  private attachmnetContext: string = "/attachments";
  private processContext: string = "/processes";
  private url: string;

  constructor(private clientService: ClientService, private uploadDownloadService: UploadDownloadService, private securityService: SecurityService, private http: HttpClient) { }


  // public uploadAttachment(attachment: AttachmentModel) : Observable<AttachmentResponseModel> {

  //     let formData : FormData = new FormData();
  //     formData.append('file', attachment?.file);
  //     formData.append('processId', attachment?.processId?.toString());
  //     formData.append('fileName', attachment?.fileName);

  //     this.url = this.clientService.urlProcessingWS(`${this.processContext}/attachment/upload`);
  
  
      
  //     return this.http.post<AttachmentResponseModel>(this.url, formData).pipe(take(1));
  //   }

  public downloadAttachmentById(attachment: AttachmentModel) : void {
    this.url = this.clientService.urlProcessingWS(`/attachments/download/${attachment?.id}`);
    this.uploadDownloadService.download(this.url).subscribe(
      (response) => {
        this.uploadDownloadService.handleFile(response, attachment?.originalFileName);
      }
    )
  }
}
