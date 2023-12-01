import { Routes } from '@angular/router';
import { AllocationListComponent } from 'app/modules/allocation/allocation-list/allocation-list.component';
import { AllocationComponent } from 'app/modules/allocation/allocation.component';
import { BatchAllocationFormComponent } from 'app/modules/allocation/batch-allocation-form/batch-allocation-form.component';
import { ComplainerDetailsComponent } from 'app/modules/complainer/complainer-details/complainer-details.component';
import { ComplainerFormComponent } from 'app/modules/complainer/complainer-form/complainer-form.component';
import { ComplainerListComponent } from 'app/modules/complainer/complainer-list/complainer-list.component';
import { ComplainerComponent } from 'app/modules/complainer/complainer.component';
import { ProcessDetailsComponent } from 'app/modules/process/process-details/process-details.component';
import { ProcessFormComponent } from 'app/modules/process/process-form/process-form.component';
import { ProcessListComponent } from 'app/modules/process/process-list/process-list.component';
import { ProcessComponent } from 'app/modules/process/process.component';
import { SatffListComponent } from 'app/modules/staff/satff-list/satff-list.component';
import { StaffDetailsComponent } from 'app/modules/staff/staff-details/staff-details.component';
import { StaffFormComponent } from 'app/modules/staff/staff-form/staff-form.component';
import { StaffComponent } from 'app/modules/staff/staff.component';
import { UserDetailsComponent } from 'app/modules/user/user-details/user-details.component';
import { UserFormComponent } from 'app/modules/user/user-form/user-form.component';
import { UserListComponent } from 'app/modules/user/user-list/user-list.component';
import { UserTypeComponent } from 'app/modules/user/user-type/user-type.component';
import { UserComponent } from 'app/modules/user/user.component';

import {
  SingleAllocationFormComponent,
} from './../../modules/allocation/single-allocation-form/single-allocation-form.component';
import { FollowUpAllocationProcessComponent } from 'app/modules/allocation/follow-up-allocation-process/follow-up-allocation-process.component';
import { StaffFollowUpAllocationProcessComponent } from 'app/modules/allocation/staff-follow-up-allocation-process/staff-follow-up-allocation-process.component';
import { HasPermissionGuard } from 'app/security/guards/has-permission.guard';

export const BackOfficeLayoutRouting: Routes = [
  {
    path: '',
    // component: BackOfficeHomeComponent,
    redirectTo: "users/list",
    pathMatch: "full",
  },
  {
    path: 'users',
    component: UserComponent,
    children: [
      {
        path: 'list',
        component: UserListComponent,
        canActivate: [HasPermissionGuard],
        data: {
          permissions: ['LIST_USER']
        }
      },
      {
        path: 'details/:id',
        component: UserDetailsComponent,
        canActivate: [HasPermissionGuard],
        data: {
          permissions: ['GET_USER']
        }
      },
      {
        path: 'user-type',
        component: UserTypeComponent,
        canActivate: [HasPermissionGuard],
        data: {
          permissions: ['CREATE_USER']
        }
      },
      {
        path: 'create-edit',
        component: UserFormComponent,
        canActivate: [HasPermissionGuard],
        data: {
          permissions: ['CREATE_USER']
        }
      }
    ]
  },
  {
    path: 'public-server/complainers',
    component: ComplainerComponent,
    children: [
      {
        path: 'list',
        component: ComplainerListComponent
      },
      {
        path: 'create-edit',
        component: ComplainerFormComponent
      },
      {
        path: 'create-edit/:complainerId',
        component: ComplainerFormComponent
      },
      {
        path: 'details/:complainerId',
        component: ComplainerDetailsComponent
      }
    ]
  },
  {
    path: 'public-server/staffs',
    component: StaffComponent,
    children: [
      {
        path: 'list',
        component: SatffListComponent
      },
      {
        path: 'create-edit',
        component: StaffFormComponent
      },
      {
        path: 'create-edit/:staffId',
        component: StaffFormComponent
      },
      {
        path: 'details/:staffId',
        component: StaffDetailsComponent
      }
    ]
  },
  {
    path: 'processes',
    component: ProcessComponent,
    children: [
      {
        path: 'list',
        component: ProcessListComponent,
        canActivate: [HasPermissionGuard],
        data: {
          permissions: ['GET_PROCESS']
        }
      },
      {
        path: 'create-edit',
        component: ProcessFormComponent,
        canActivate: [HasPermissionGuard],
        data: {
          permissions: ['CREATE_PROCESS']
        }
      },
      // {
      //   path: 'details',
      //   component: ProcessFormComponent
      // },
      {
        path: 'details/:processId',
        component: ProcessDetailsComponent,
        canActivate: [HasPermissionGuard],
        data: {
          permissions: ['GET_PROCESS']
        }
      }
    ]
  },
  {
    path: 'allocations',
    component: AllocationComponent,
    children: [
      {
        path: 'list-all',
        component: AllocationListComponent
      },
      {
        path: 'all-mine',
        component: AllocationListComponent
      },
      {
        path: 'follow-up/:allocationId',
        component: StaffFollowUpAllocationProcessComponent,
        canActivate: [HasPermissionGuard],
        data: {
          permissions: ['FOLLOW_UP_PROCESS']
        }
      },
      {
        path: 'batch-allocation',
        component: BatchAllocationFormComponent,
        canActivate: [HasPermissionGuard],
        data: {
          permissions: ['ALLOCATE_PROCESS']
        }
      },
      {
        path: 'single-allocation/:processId',
        component: SingleAllocationFormComponent,
        canActivate: [HasPermissionGuard],
        data: {
          permissions: ['ALLOCATE_PROCESS']
        }
      }
    ]
  }
]
