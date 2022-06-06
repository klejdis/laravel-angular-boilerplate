import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  constructor(
    private classToggler: ClassToggleService,
    private authService: AuthService,
    private router: Router
  ) {
    super();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
