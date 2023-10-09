import { Routes } from "@angular/router";

import { CitezenLayoutComponent } from "./citezen-layout.component";
import { ProcessListComponent } from "app/modules/process/process-list/process-list.component";
import { ProcessComponent } from "app/modules/process/process.component";
import { CitezenHomeComponent } from "./citezen-home/citezen-home.component";

export const CitezenLayoutRouting: Routes = [
  {
    path: "",
    component: CitezenHomeComponent
  },
  {
    path: "process",
    component: ProcessComponent,
    children: [
      {
        path: "list",
        component: ProcessListComponent,
      },
    ],
  },
];
