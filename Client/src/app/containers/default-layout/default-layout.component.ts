import { Component } from '@angular/core';

import { navItems } from './_nav';
import {Spinkit} from "ng-http-loader";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

  public navItems = navItems;
  public spinkit = Spinkit;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {}
}
