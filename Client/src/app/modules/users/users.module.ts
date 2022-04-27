import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { UsersComponent} from "./components/list/users.component";

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UsersComponent
  ]
})
export class UsersModule{}
