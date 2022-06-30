import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule as FM } from '@angular/forms';
import { AgGridModule} from "ag-grid-angular";
import { NgSelectModule} from "@ng-select/ng-select";
import { DirectivesModule } from "../../directives/directives/directives.module";

// CoreUI Modules
import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';

// views
import {UsersComponent} from "./index/users.component";

// Components Routing
import { UsersRoutingModule } from './users-routing.module';
import {UsersService} from "./users.service";
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import {AgSearchBoxModule} from "../../components/ag-searchbox/ag-search-box.module";

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    ButtonModule,
    CardModule,
    GridModule,
    ReactiveFormsModule,
    FormModule,
    AgGridModule,
    FM,
    NgSelectModule,
    DirectivesModule,
    AgSearchBoxModule,
    IconModule
  ],
    declarations: [
        UsersComponent,
        CreateComponent,
        EditComponent,
    ],
  providers: [
    UsersService,
  ]
})
export class UsersModule {}
