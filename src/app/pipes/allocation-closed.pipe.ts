import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'allocationClosed'
})
export class AllocationClosedPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'Fechada' : 'Aberta';
  }

}
