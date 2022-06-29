import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule as FM } from '@angular/forms';
import { AgGridModule} from "ag-grid-angular";
import { NgSelectModule} from "@ng-select/ng-select";

import { IndexComponent } from './index/index.component';
import {RolesRoutingModule} from "./roles-routing.module";
import {RolesService} from "./roles.service";


// CoreUI Modules
import {
  AccordionModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonModule,
  CardModule,
  CarouselModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  NavModule,
  PaginationModule,
  PlaceholderModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  SpinnerModule,
  TableModule,
  TabsModule,
  TooltipModule,
  UtilitiesModule
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';

// utils
import { DocsComponentsModule } from '../../../components/docs/docs-components.module';
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
    CommonModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    GridModule,
    UtilitiesModule,
    SharedModule,
    ListGroupModule,
    IconModule,
    ListGroupModule,
    PlaceholderModule,
    ProgressModule,
    SpinnerModule,
    TabsModule,
    NavModule,
    TooltipModule,
    CarouselModule,
    FormModule,
    ReactiveFormsModule,
    DropdownModule,
    PaginationModule,
    PopoverModule,
    TableModule,
    DocsComponentsModule,
    AgGridModule,
    FM,
    NgSelectModule,
    AgSearchBoxModule
  ],
  providers: [
    RolesService
  ]
})
export class RolesModule { }
