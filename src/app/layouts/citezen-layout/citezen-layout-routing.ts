import { Routes } from "@angular/router";

import { CitezenLayoutComponent } from "./citezen-layout.component";
import { ProcessListComponent } from "app/modules/process/process-list/process-list.component";
import { ProcessComponent } from "app/modules/process/process.component";
import { CitezenHomeComponent } from "./citezen-home/citezen-home.component";
import { ProcessFormComponent } from "app/modules/process/process-form/process-form.component";
import { ProcessDetailsComponent } from "app/modules/process/process-details/process-details.component";
import { AllocationComponent } from "app/modules/allocation/allocation.component";
import { ComplainerFollowUpAllocationProcessComponent } from "app/modules/allocation/complainer-follow-up-allocation-process/complainer-follow-up-allocation-process.component";

export const CitezenLayoutRouting: Routes = [
  {
    path: "",
    redirectTo: "processes/list",
    pathMatch: "full",
  },
  {
    path: "processes",
    component: ProcessComponent,
    children: [
      {
        path: "list",
        component: ProcessListComponent,
      },
      {
        path: 'create-edit',
        component: ProcessFormComponent
      },
      {
        path: 'details/:processId',
        component: ProcessDetailsComponent
      }
    ],
  },
  {
    path: 'allocations',
    component: AllocationComponent,
    children: [
      {
        path: 'allocation-follow-up/:allocationId',
        component: ComplainerFollowUpAllocationProcessComponent
      }
    ]
  }
  
];
