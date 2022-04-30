import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent} from "./index/users.component";
import {CreateComponent} from "./create/create.component";

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}

