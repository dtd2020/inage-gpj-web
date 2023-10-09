import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class JwtUtilService {
  constructor() {}
}

export function tokenGetter() {
  return sessionStorage.getItem('token');
}
