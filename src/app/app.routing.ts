import { Routes } from '@angular/router';

import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BackOfficeLayoutComponent } from './layouts/back-office-layout/back-office-layout.component';
import { CitezenLayoutComponent } from './layouts/citezen-layout/citezen-layout.component';
import { GuestLayoutComponent } from './layouts/guest-layout/guest-layout.component';
import { AuthGuard } from './security/guards/auth-guard';
import { BackOfficeGuard } from './security/guards/back-office.guard';

export const AppRoutes: Routes = [
  {
    path: "",
    redirectTo: "guest",
    pathMatch: "full",
  },

  {
    path: "guest",
    component: GuestLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("app/layouts/guest-layout/guest-layout.module").then(
            (m) => m.GuestLayoutModule
          ),
      },
    ],
  },

  {
    path: "auth",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("app/layouts/auth-layout/auth-layout.module").then(
            (m) => m.AuthLayoutModule
          ),
      },
    ],
  },

  {
    path: "citezen",
    component: CitezenLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("app/layouts/citezen-layout/citezen-layout.module").then(
            (m) => m.CitezenLayoutModule
          ),
      },
    ],
  },

  {
    path: "back-office",
    component: BackOfficeLayoutComponent,
    canActivate: [AuthGuard, BackOfficeGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import(
            "app/layouts/back-office-layout/back-office-layout.module"
          ).then((m) => m.BackOfficeLayoutModule),
      },
    ],
  },
];
