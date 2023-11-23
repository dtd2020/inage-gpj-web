import { JwtHelperService } from '@auth0/angular-jwt';

import { Injectable } from '@angular/core';
import { DecodedTokenModel } from '../models/auth-model';
import { LocalUserModel, ProfileModel, SimpleProfileModel } from '../models/local-user';
import { PermissionModel, UserModel } from 'app/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class SecurityUtilService {

  constructor(private jwt: JwtHelperService) { }

  public test() {
    return 'Test'
  }

  public getToken() : string {
    return localStorage.getItem('token');
  }

  public setToken(token : string) {
    localStorage.setItem('token', token);
  }


  public removeToken() : void {
    localStorage.removeItem('token');
  }

  public isTokenExpired() : boolean {
    return this.jwt.isTokenExpired(this.getToken());
  }

  public getDecodedToken() {
    return this.jwt.decodeToken(this.getToken()) as DecodedTokenModel;
  }

  public getLocalUserFromToken() : LocalUserModel {
    if(this.getToken()) {
      return this.getDecodedToken()?.user;
    } else {
      return null;
    }
    
  }

  public getLocalUserDetailsByToken(token : string) : LocalUserModel {
    return this.getDecodedToken()?.user;
    
  }

  public isIncludedProfile(profiles: SimpleProfileModel[], profileCode: string) {
    let result: boolean = false;
    profiles.forEach((profile) => {
      if (profile.code == profileCode) {
        result = true;
      }
    });

    return result;
  }
}
