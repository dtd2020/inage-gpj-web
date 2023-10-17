import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, take, Observable } from "rxjs";

import { ClientService } from "./client.service";
import {
  DecodedTokenModel,
  LoginRequestModel,
  LoginResponseModel,
} from "../models/auth-model";
import { SecurityUtilService } from "../utils/security-util.service";
import { LocalUserModel, ProfileModel } from "../models/local-user";

@Injectable({
  providedIn: "root",
})
export class SecurityService {
  private localUser$ = new BehaviorSubject<LocalUserModel>(null);
  public localUser = this.localUser$.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private clientService: ClientService,
    private securityUtil: SecurityUtilService
  ) {
    this.localUser$.next(this.getLocalUserFromToken());
  }

  public attemptLogin(authRequest: LoginRequestModel) {
    this.http
      .post<LoginResponseModel>(
        this.clientService.urlAuthWS(`/auth/login`),
        authRequest
      )
      .pipe(take(1))
      .subscribe(
        (response) => {
          this.setToken(response.token);
          this.localUser$.next(this.getLocalUserFromToken());
          
          this.redirectAfterLogin(this.getLocalUserFromToken());
        }
      );
  }

  public getToken(): string {
    return this.securityUtil.getToken();
  }

  private setToken(token: string): void {
    this.securityUtil.setToken(token);
  }

  public isTokenExpired(): boolean {
    return this.securityUtil.isTokenExpired();
  }

  public getDecodedToken(): DecodedTokenModel {
    return this.securityUtil.getDecodedToken();
  }

  public getLocalUserFromToken(): LocalUserModel {
    return this.securityUtil.getLocalUserFromToken();
  }

  private redirectAfterLogin(user: LocalUserModel) {
    if (this.securityUtil.isIncludedProfile(user?.profiles, "ADMIN")) {
      this.router.navigate(["/back-office"]);
    } else if (this.securityUtil.isIncludedProfile(user?.profiles, "USER")) {
      this.router.navigate(["/citezen"]);
    } else {
      this.router.navigate(["/auth/login"]);
    }
  }


  public logout(): void {
    this.securityUtil.removeToken();
    this.localUser$.next(null);
    this.router.navigate(["/auth/login"]);
  }
}
