import { Pipe, PipeTransform } from '@angular/core';
import { ProcessStatusEnum } from 'app/models/enums/process-status-enum';
import { ProcessStatusModel } from 'app/models/process-model';

@Pipe({
  name: 'processStatus'
})
export class ClosureStatusPipe implements PipeTransform {

  transform(key: string): string {
    let closureStatueses : ProcessStatusModel[] = ProcessStatusEnum.asArray;
    let result = null;

    closureStatueses.forEach(status => {
      if(status.key === key) {        
        result = status.value;
      }
    })

    return result;
  }

}
