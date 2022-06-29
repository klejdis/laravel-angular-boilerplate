import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CanDirective} from "./can/can.directive";
import { CreditCardDirective } from './credit-card/credit-card.directive';


@NgModule({
  declarations: [
    CanDirective,
    CreditCardDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CanDirective,
    CreditCardDirective
  ]
})
export class DirectivesModule { }
