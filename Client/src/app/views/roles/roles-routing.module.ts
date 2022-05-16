import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {IndexComponent} from "./index/index.component";
import {CreateEditComponent} from "./create-edit/create-edit.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Roles',
    },
    children: [
      {
        path: '',
        redirectTo: 'index',
      },
      {
        path: 'index',
        component: IndexComponent,
        data: {
          title: 'List',
        },
      },
      {
        path: ':id/edit',
        component: CreateEditComponent,
        data: {
          title: 'Edit Role',
        },
      },
      {
        path: 'create',
        component: CreateEditComponent,
        data: {
          title: 'Create Role',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {}

