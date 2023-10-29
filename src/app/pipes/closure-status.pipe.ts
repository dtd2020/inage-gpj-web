import { Pipe, PipeTransform } from '@angular/core';
import { ClosureStatusEnum } from 'app/models/enums/closure-status-enum';
import { ClosureStatusModel } from 'app/models/process-model';

@Pipe({
  name: 'closureStatus'
})
export class ClosureStatusPipe implements PipeTransform {

  transform(key: string): string {
    let closureStatueses : ClosureStatusModel[] = ClosureStatusEnum.asArray;
    let result = null;

    closureStatueses.forEach(status => {
      if(status.key === key) {        
        result = status.value;
      }
    })

    return result;
  }

}
