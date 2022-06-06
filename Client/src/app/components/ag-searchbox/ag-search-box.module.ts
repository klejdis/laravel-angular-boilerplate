import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AgSearchComponent} from "./ag-search.component";
import {IconModule} from "@coreui/icons-angular";

@NgModule({
  declarations: [
    AgSearchComponent
  ],
  imports: [
    CommonModule,
    IconModule
  ],
  exports:[
    AgSearchComponent
  ]
})
export class AgSearchBoxModule { }
