
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormArray,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ComplainerModel } from "app/models/complainer-model";
import { UserTypeEnum } from "app/models/enums/user-type-enum";
import { StaffModel } from 'app/models/staff-model';
import { PermissionModel, ProfileModel, UserModel, UserRequestModel } from "app/models/user-model";
import { ComplainerService } from "app/services/complainer.service";
import { StaffService } from 'app/services/staff.service';
import { UserService } from "app/services/user.service";
import { FormValidation } from "app/shared/form-validation/form-validation.component";
import { GenericComponent } from "app/shared/generic/generic.component";
import { SwalManagementService } from "app/shared/swal-management.service";
import { isEmpty } from "app/shared/utils/utils";
import Swal from "sweetalert2";
@Component({
  selector: "user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss"],
})
export class UserFormComponent extends GenericComponent implements OnInit {

  public form: FormGroup;
  public canShowForm: boolean = false;

  private user: UserModel;
  private userId: number;
  private userType : string;
  public profiles: ProfileModel[] = [];
  public permissions: PermissionModel[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private complainerService: ComplainerService,
    private staffService: StaffService,
    private route: ActivatedRoute,
    private router: Router,
    private swalManagService: SwalManagementService
  ) {
    super();
  }

  ngOnInit(): void {


    this.route.queryParams.subscribe(
      (params) => {
        if (params.userId != null && params.userId != undefined && params.userId != "") {
          this.userId = params.userId;
        }
        
        if (params.userType != null && params.userType != undefined && params.userType != "") {
          this.userType = params.userType;
        }
      }
    );

    this.fetchUserResources();

  }

  public fetchUserResources(): void {
    this.userService.fetchUserResources().subscribe(
      (resources) => {
        this.profiles = resources.profiles;
        this.permissions = resources.permissions;

        

        if (this.userId) {
          this.fetchUser(this.userId);
        } else {

          if(!isEmpty(this.userType) && this.userType === UserTypeEnum.CITEZEN.key) {
            this.profiles = this.profiles.filter(p => p.code === 'COMPLAINER')
            
          } else if(!isEmpty(this.userType) && this.userType !== UserTypeEnum.CITEZEN.key) {
            this.profiles = this.profiles.filter(p => p.code !== 'COMPLAINER')
          }

          this.createForm();
          this.canShowForm = true;
        }


      }
    )
  }

  public fetchUser(userId: number): void {
    this.userService.fetchUserById(userId).subscribe(
      (user) => {
        this.user = user;
        this.createForm();
        this.patchUserForm(user);
        this.canShowForm = true;

      }
    )
  }

  public createForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      // name: [null, [Validators.required]],
      // mobile: [null, [Validators.required, FormValidation.phone]],
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      profiles: this.buildProfiles(),
      permissions: this.buildPermissions()
    });
  }

  private buildProfiles() {
    const values = this.profiles.map(profile => {
      return new FormControl(this.checkProfileExistenceInUser(profile.id))
    });
    return this.formBuilder.array(values, [this.dynamicCheckboxValidator]);
  }

  private checkProfileExistenceInUser(profileId: number) {
    if (this.user?.profiles == null || this.user?.profiles == undefined) {
      return false;
    }
    return this.user?.profiles.some(profile => profile.id === profileId);
  }

  private buildPermissions() {
    const values = this.permissions.map(permission => {
      return new FormControl(this.checkPermissionExistenceInUser(permission.id))
    });
    return this.formBuilder.array(values, [this.dynamicCheckboxValidator]);
  }

  private checkPermissionExistenceInUser(permissionId: number) {
    if (this.user?.permissions == null || this.user?.permissions == undefined) {
      return false;
    }
    return this.user?.permissions.some(permission => permission.id === permissionId);
  }


  onProfileChange(profile: ProfileModel, event: any) {

    let profilePermissions = profile?.permissions;
    let matchPermissionIndexes: number[] = [];

    profilePermissions.forEach((profilePermission, profPermIndex) => {
      this.permissions.some((permission, perInex) => {
        if (profilePermission.id === permission.id) {
          matchPermissionIndexes.push(perInex)
          return true;
        } else {
          return false;
        }
      })
    })


    this.form.patchValue({
      permissions: this.permissions.map((p, i) => {
        if (matchPermissionIndexes.includes(i)) {
          if (event.target.checked === true) {
            return true;
          } else {
            if (this.doesExistsCheckedProfileWithThisPermission(this.permissions[i])) {
              return true;
            } else {
              return false;
            }

          }
        } else {
          return this.form.value.permissions[i];
        }
      })
    });


  }

  public doesExistsCheckedProfileWithThisPermission(permission: PermissionModel): boolean {
    let result = false;
    let formProfiles: boolean[] = this.form.value.profiles;
    let formProfilePositionsChecked: number[] = [];

    formProfiles.forEach((p, i) => {
      if (p === true) {
        formProfilePositionsChecked.push(i);
      }
    })

    if (formProfilePositionsChecked.length > 0) {
      formProfilePositionsChecked.forEach((position) => {
        result = this.profiles[position].permissions.some((p) => permission.code === p.code);
      })

    }
    return result;
  }

  private patchUserForm(user: UserModel): void {

    this.form.patchValue({
      id: user.id,
      // name: user.name,
      // mobile: user.mobile,
      username: user.username,
      email: user.email,
    })



  }


  public onSubmit(): void {
    if (this.isValidForm(this.form)) {
      let requestUserData: UserRequestModel = this.getFormDataRequest(this.form);
      // this.createComplainer(this.getComplainerDataRequest(this.form, 52));
      // return;
      this.userService.saveUser(requestUserData).subscribe(
        (user) => {
          if(this.userType === UserTypeEnum.CITEZEN.key) {
            // this.createComplainer(this.getComplainerDataRequest(this.form, user?.id));
            this.router.navigate(['back-office/complainers/create-edit'], {queryParams: {userId: user.id}})
          } else {
            // this.createStaff(this.getStaffDataRequest(this.form, user?.id));
            this.router.navigate(['back-office/staffs/create-edit'], {queryParams: {userId: user.id}})
          }
          // this.swalManagService.sweetAlterSuccess("Operação realizada com sucesso.", "back-office/users/list")
        }
      );
    } else {
      return;
    }
  }

  public createComplainer(complainer: ComplainerModel) : void {
    this.complainerService.saveComplainer(complainer).subscribe(
      (complainer) => {
        this.swalManagService.sweetAlterSuccess("Operação realizada com sucesso.", "back-office/users/list")
      }
    )
  }

  public createStaff(staff: StaffModel) : void {
    this.staffService.saveStaff(staff).subscribe(
      (staff) => {
        this.swalManagService.sweetAlterSuccess("Operação realizada com sucesso.", "back-office/users/list")
      }
    )
  }

  private getFormDataRequest(form: any) {

    let formRequestData: UserRequestModel = form.value;
    let tempProfileIds: number[] = [];
      let tempPermissionIds: number[] = [];

    var tempProfiles = this.profiles.slice();
    const selectedProfileIds = this.form.value.profiles
      .map((checked, i) => checked ? this.profiles[i].id : null)
      .filter(v => v !== null);

    var tempPermissions = this.permissions.slice();
    const selectedPermissionIds = this.form.value.permissions
      .map((checked, i) => checked ? this.permissions[i].id : null)
      .filter(v => v !== null);


    for (var i = this.profiles.length - 1; i >= 0; i--) {
      if (selectedProfileIds.indexOf(this.profiles[i].id) < 0) {
        tempProfiles.splice(i, 1);
      }
    }

    for (var i = this.permissions.length - 1; i >= 0; i--) {
      if (selectedPermissionIds.indexOf(this.permissions[i].id) < 0) {
        tempPermissions.splice(i, 1);
      }
    }

    
    tempProfiles.forEach(temProfile => {
      tempProfileIds.push(temProfile.id);
    })

    tempPermissions.forEach(temPermission => {
      tempPermissionIds.push(temPermission.id);
    })


    formRequestData.profileIds = tempProfileIds;
    formRequestData.permissionIds = tempPermissionIds;
    formRequestData.email =  isEmpty(form.value?.email) ? null : form.value?.email.toLowerCase();

    return formRequestData;
  }


  public getComplainerDataRequest(form: any, userId: number) {
    let formComplainerDataRequest: ComplainerModel = {
      id: null,
      name: form?.value?.name,
      nuit: form?.value?.username,
      email: form?.value?.email,
      mobile: form?.value?.mobile,
      address: form?.value?.address,
      userId: userId
    };
    
    return formComplainerDataRequest;
  }

  public getStaffDataRequest(form: any, userId: number) {
    let formStaffDataRequest: StaffModel = {
      id: null,
      name: form?.value?.name,
      nuit: form?.value?.username,
      email: form?.value?.email,
      mobile: form?.value?.mobile,
      address: form?.value?.address,
      userId: userId
    }
    return formStaffDataRequest;
  }
}
