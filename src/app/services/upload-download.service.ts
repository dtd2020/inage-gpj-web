import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadDownloadService {

  constructor(private http: HttpClient) { }


  download(url: string) {

    return this.http.get(url, {
      responseType: 'blob' as 'json'
    });

  }


  handleFile(response: any, fileName: string) {

    const file = new Blob([response], {
      type: response.type
    });

    // IE
    const navigator = window.navigator as any;
    if(navigator && navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(file);
    }

    const blob = window.URL.createObjectURL(file);

    const link = document.createElement('a');
    link.href = blob;
    link.download = fileName;

    link.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }));


    setTimeout(() => {
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 100);
  }
}
