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

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends GenericComponent implements OnInit {

  public users: UserModel[];

  constructor(private userService: UserService, private ngxPermissionService: NgxPermissionsService, private router: Router, private swalManagService: SwalManagementService) { 
    super()
  }

  ngOnInit(): void {
    this.fetchAllUsers();
    let permissions = this.ngxPermissionService.getPermissions();
    console.log(permissions);
  //   this.ngxPermissionService.loadPermissions(['DELETE_USER']);
    
  //   this.ngxPermissionService.permissions$.subscribe((permissions) => {
  //     console.log(permissions)
  // })
  }

  public fetchAllUsers(): void {
    this.userService.fetchAllUsers().subscribe(
      (response) => {
        this.users = response;
        
      }
    )
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
