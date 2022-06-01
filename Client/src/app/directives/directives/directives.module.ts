import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CanDirective} from "./can/can.directive";


@NgModule({
  declarations: [
    CanDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CanDirective
  ]
})
export class DirectivesModule { }
