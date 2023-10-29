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

  private staffContext: string = "/staffs";
  private url: string;

  constructor(private clientService: ClientService, private http: HttpClient) { }

  public findAllStaffes() : Observable<StaffModel[]> {
    this.url = this.clientService.urlProcessingWS(`${this.staffContext}/find-all`);
    return this.http.get<StaffModel[]>(this.url);
  }

  public fetchAllStaffes() : Observable<StaffModel[]> {
    this.url = this.clientService.urlProcessingWS(`${this.staffContext}/fetch-all`);
    return this.http.get<StaffModel[]>(this.url);
  }
  
  public findStaffByUserId(userId: number) : Observable<StaffModel> {
    this.url = this.clientService.urlProcessingWS(`${this.staffContext}/find-by-user-id/${userId}`);
    return this.http.get<StaffModel>(this.url);
  }

  public findStaffById(staffId: number) : Observable<StaffModel> {
    this.url = this.clientService.urlProcessingWS(`${this.staffContext}/find-by-id/${staffId}`);
    return this.http.get<StaffModel>(this.url);
  }

  public saveStaff(staff: StaffModel): Observable<StaffModel> {
    if(isEmpty(staff?.id)) {
      return this.createStaff(staff);
    } else {
      return this.updateStaff(staff?.id, staff);
    }
  }

  public createStaff(staff: StaffModel): Observable<StaffModel> {
    this.url = this.clientService.urlProcessingWS(`${this.staffContext}/create/`);
    return this.http.post<StaffModel>(this.url, staff);
  }

  public updateStaff(staffId: number, staff: StaffModel): Observable<StaffModel> {
    this.url = this.clientService.urlProcessingWS(`${this.staffContext}/update/${staffId}`);
    return this.http.put<StaffModel>(this.url, staff);
  }
}
