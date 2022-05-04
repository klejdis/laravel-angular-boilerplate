import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent} from "./index/users.component";
import {CreateComponent} from "./create/create.component";
import {EditComponent} from "./edit/edit.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Users',
    },
    children: [
      {
        path: '',
        redirectTo: 'index',
      },
      {
        path: 'index',
        component: UsersComponent,
        data: {
          title: 'List',
        },
      },
      {
        path: 'create',
        component: CreateComponent,
        data: {
          title: 'Create User',
        },
      },
      {
        path: ':id/edit',
        component: EditComponent,
        data: {
          title: 'Edit User',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}

