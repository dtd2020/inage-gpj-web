import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageRequestModel, SortByModel } from 'app/models/pageable-meta-model';
import { isEmpty } from './utils';

@Injectable({
  providedIn: 'root'
})
export class HttpParamsUtilService {

  constructor() { }

  public getPageRequestParams(pageRequest: PageRequestModel): HttpParams {

    let params = new HttpParams();

    if(!isEmpty(pageRequest.offset)) {
      params = params.append("offset", pageRequest.offset);
    }
    if(!isEmpty(pageRequest.pageSize)) {
      params = params.append("pageSize", pageRequest.pageSize);
    }

    if(!isEmpty(pageRequest.filter)) {
      params = params.append("filter", pageRequest.filter);
    }
    
    if(!isEmpty(pageRequest.sortBy)) {
      pageRequest.sortBy.forEach(sort => {
        params = params.append("sortBy", sort.property + "," + sort.direction);
      })
    }
    

    return params;

  }
}
