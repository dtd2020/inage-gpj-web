import { Pipe, PipeTransform } from '@angular/core';
import { AlertContextEnum } from 'app/models/enums/alert-context-enum';

@Pipe({
  name: 'alertContext'
})
export class AlertContextPipe implements PipeTransform {

  transform(key: string): string {
    let alertContexts = AlertContextEnum.asArray;
    let result = null;

    alertContexts.forEach(aContext => {
      if(aContext.key === key) {
        result = aContext.value
      }
    })

    return result;
  }

}
