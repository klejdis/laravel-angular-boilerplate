import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule as FM } from '@angular/forms';

import { AgGridModule} from "ag-grid-angular";
import { NgSelectModule} from "@ng-select/ng-select";

import { IndexComponent } from './index/index.component';
import {RolesRoutingModule} from "./roles-routing.module";
import {RolesService} from "./roles.service";


// CoreUI Modules
import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  TabsModule,
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';

// utils
import { CreateEditComponent } from './create-edit/create-edit.component';
import {AgSearchBoxModule} from "../../components/ag-searchbox/ag-search-box.module";


@NgModule({
  declarations: [
    IndexComponent,
    CreateEditComponent,
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    CardModule,
    NavModule,
    TabsModule,
    ButtonModule,
    GridModule,
    FormModule,
    ReactiveFormsModule,
    AgSearchBoxModule,
    IconModule,
    AgGridModule,
    FM,
    NgSelectModule
  ],
  providers: [
    RolesService
  ]
})
export class RolesModule { }
