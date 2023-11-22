import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageRequestModel } from 'app/models/pageable-meta-model';
import { UserModel, UserPageModel, UserRequestModel, UserResourceModel } from 'app/models/user-model';
import { ClientService } from 'app/security/services/client.service';
import { HttpParamsUtilService } from 'app/shared/utils/http-params-util.service';
import { isEmpty } from 'app/shared/utils/utils';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class UserService {
  private userContext: string = "/users";
  private url: string;

  constructor(private http: HttpClient, private clientService: ClientService, private httpParamsUtilService: HttpParamsUtilService) {}

  public fetchAllUsersPageable(pageRequest: PageRequestModel) : Observable<UserPageModel> {   
    
    let params = this.httpParamsUtilService.getPageRequestParams(pageRequest);
    this.url = this.clientService.urlAuthWS(`${this.userContext}/fetch-all/pageable`);
    return this.http.get<UserPageModel>(this.url, {params: params}).pipe(take(1));
  }

  public fetchUserById(userId: number): Observable<UserModel> {
    this.url = this.clientService.urlAuthWS(`${this.userContext}/fetch-by-id/${userId}`);
    return this.http.get<UserModel>(this.url).pipe(take(1));
  }

  public findUserById(userId: number): Observable<UserModel> {
    this.url = this.clientService.urlAuthWS(`${this.userContext}/find-by-id/${userId}`);
    return this.http.get<UserModel>(this.url).pipe(take(1));
  }

  public saveUser(user: UserRequestModel): Observable<UserModel> {
    if(user?.id) {
      return this.updateUser(user);
    } else {
      return this.createUser(user);
    }
  }

  public updateUser(user: UserRequestModel): Observable<UserModel> {
    this.url = this.clientService.urlAuthWS(`${this.userContext}/update/${user?.id}`);
    return this.http.put<UserModel>(this.url, user).pipe(take(1));
  }

  public createUser(user: UserRequestModel): Observable<UserModel> {
    this.url = this.clientService.urlAuthWS(`${this.userContext}/create`);
    return this.http.post<UserModel>(this.url, user).pipe(take(1));
  }

  public fetchUserResources() : Observable<UserResourceModel> {
    this.url = this.clientService.urlAuthWS(`${this.userContext}/fetch-resources`);
    return this.http.get<UserResourceModel>(this.url).pipe(take(1));
  }

  public deleteUser(userId: number): Observable<void> {
    this.url = this.clientService.urlAuthWS(`${this.userContext}/delete/${userId}`);
    return this.http.delete<void>(this.url).pipe(take(1));
  }
}
