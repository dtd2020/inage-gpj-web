import { Injectable } from '@angular/core';
import { ProcessFilterSearchMap } from '../maps/FilterSearch/process-filter-search-map/process-filter-search-map.component';

@Injectable({
  providedIn: 'root'
})
export class FilterSearchMapUtilService {

  constructor() { }

  public static getFilter(filter: string, entity: string) : string {
    return ProcessFilterSearchMap.getFilter(filter, entity);
  }
}
