import { Component, OnInit } from '@angular/core';
import { GenericComponent } from 'app/shared/generic/generic.component';

@Component({
  selector: 'complainer-follow-up-allocation-process',
  templateUrl: './complainer-follow-up-allocation-process.component.html',
  styleUrls: ['./complainer-follow-up-allocation-process.component.scss']
})
export class ComplainerFollowUpAllocationProcessComponent extends GenericComponent implements OnInit{

  constructor() {
    super()
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
