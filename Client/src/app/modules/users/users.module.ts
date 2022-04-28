import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { UsersComponent} from "./components/list/users.component";
import {UsersService} from "./users.service";

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    UsersComponent
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule{}
