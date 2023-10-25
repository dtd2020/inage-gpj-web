import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientService } from 'app/security/services/client.service';
import { ComplainerModel } from 'app/models/complainer-model';
import { StaffModel } from 'app/models/staff-model';
import { isEmpty } from 'app/shared/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private staffContext: string = "/staffes";
  private url: string;

  constructor(private clientService: ClientService, private http: HttpClient) { }

  public findStaffByUserId(userId: number) : Observable<StaffModel> {
    this.url = this.clientService.urlProcessingWS(`${this.staffContext}/find-by-user-id/${userId}`);
    return this.http.get<StaffModel>(this.url);
  }

  public saveStaff(staff: StaffModel): Observable<StaffModel> {
    if(isEmpty(staff?.id)) {
      return this.createComplainer(staff);
    } else {
      return this.updateComplainer(staff?.id, staff);
    }
  }

  public createComplainer(staff: StaffModel): Observable<StaffModel> {
    this.url = this.clientService.urlProcessingWS(`${this.staffContext}/create/`);
    return this.http.post<StaffModel>(this.url, staff);
  }

  public updateComplainer(staffId: number, staff: StaffModel): Observable<StaffModel> {
    this.url = this.clientService.urlProcessingWS(`${this.staffContext}/update/${staff}`);
    return this.http.put<StaffModel>(this.url, staff);
  }
}
