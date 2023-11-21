import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'app/models/user-model';
import { JsonServiceService } from 'app/services/json-service.service';
import { UserService } from 'app/services/user.service';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { SwalManagementService } from 'app/shared/swal-management.service';
import { switchMap } from 'rxjs';
import Swal from "sweetalert2";
import { NgxPermissionsService } from 'ngx-permissions';
import { PageRequestModel, PageableMetaModel } from 'app/models/pageable-meta-model';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends GenericComponent implements OnInit {

  public users: UserModel[];
  private pageableMeta: PageableMetaModel;
  private pageRequest: PageRequestModel = {
    offset: 0,
    pageSize: 10,
    sortBy: null
  };

  constructor(private userService: UserService, private ngxPermissionService: NgxPermissionsService, private router: Router, private swalManagService: SwalManagementService) { 
    super()
  }

  ngOnInit(): void {
    this.fetchAllUsersPageable();
    let permissions = this.ngxPermissionService.getPermissions();
  }

  public fetchAllUsersPageable(): void {
    this.userService.fetchAllUsersPageable(this.pageRequest).subscribe(
      (userPageable) => {
        this.users = userPageable.data;
        this.pageableMeta = userPageable.pageableMeta;
        
      }
    )
  }

  private onPaginationEvent(event: PageRequestModel): void {
    this.pageRequest = event;
    this.fetchAllUsersPageable();
  }

  public userDetails(userId: number): void {
    this.router.navigate(['/back-office/users/details', userId]);
  }

  public editUser(userId: number): void {
    this.router.navigate(['/back-office/users/create-edit'], {queryParams: { userId: userId}});
  }

  public deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      (response) => {
        var indexOfDeleted = this.users.findIndex(user => user.id === userId);
        this.users.splice(indexOfDeleted, 1);        
        this.swalManagService.sweetAlterSuccess("Utilizador removido com sucesso", "/back-office/users/list")
      }
    )
    
  }

  
  public confirmUserDeletion(userId: number): void {

    let deleteUser = (function () {
      return this.deleteUser(userId);
    }).bind(this)

    this.swalManagService.showAlert(
      this.alertProps = {
        icon: 'warning',
        text: 'Pretende excluir este utilizador?',
        alertText: 'Confirmado.',
        callback: deleteUser
      }
    )
  }

}
