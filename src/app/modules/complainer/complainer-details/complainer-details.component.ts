import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ComplainerModel } from 'app/models/complainer-model';
import { ComplainerService } from 'app/services/complainer.service';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { SwalManagementService } from 'app/shared/swal-management.service';
import { isEmpty } from 'app/shared/utils/utils';

@Component({
  selector: 'complainer-details',
  templateUrl: './complainer-details.component.html',
  styleUrls: ['./complainer-details.component.scss']
})
export class ComplainerDetailsComponent extends GenericComponent implements OnInit{

  public complainer: ComplainerModel;

  constructor(private route: ActivatedRoute, private complainerService: ComplainerService, private router: Router, private swalManagService: SwalManagementService) { 
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(!isEmpty(params?.complainerId)) {
        this.findComplainerById(params?.complainerId);
      }
    })    
  }

  public findComplainerById(complainerId): void {
    this.complainerService.findComplainerById(complainerId).subscribe(
      (complainer) => {
        this.complainer = complainer;        
      }
    )
  }
}
