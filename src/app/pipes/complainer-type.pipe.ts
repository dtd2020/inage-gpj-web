import { Pipe, PipeTransform } from '@angular/core';
import { ComplainerTypeEnum } from 'app/models/enums/complainer-type-enum';
import { ComplainerTypeModel } from 'app/models/process-model';

@Pipe({
  name: 'complainerType'
})
export class ComplainerTypePipe implements PipeTransform {

  transform(key: string): string {
    let complainerTypes: ComplainerTypeModel[] = ComplainerTypeEnum.asArray;
    let result = null;

    complainerTypes.forEach(cType => {
      if(cType.key === key) {
        result = cType.value;
      }
    })
    return result;
  }

}
