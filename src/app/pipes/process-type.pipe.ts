import { Pipe, PipeTransform } from '@angular/core';
import { ProcessTypeEnum } from 'app/models/enums/process-type-enum';
import { ProcessTypeModel } from 'app/models/process-model';

@Pipe({
  name: 'processType'
})
export class ProcessTypePipe implements PipeTransform {

  transform(key: string): string {
    let processTypes : ProcessTypeModel[] = ProcessTypeEnum.asArray;
    let result = null;

    processTypes.forEach(pType => {
      if(pType.key === key) {
        result = pType.value
      }
    })
    return result;
  }

}
