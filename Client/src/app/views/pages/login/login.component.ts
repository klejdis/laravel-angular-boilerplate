import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MustMatch} from "../../../_helpers/must-match.validator";
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.fb.group({
    'email' : ['john.doe@example.com', Validators.required],
    'password' : ['password', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit() {

    this.authService.login(
      this.loginForm?.value.email,
      this.loginForm?.value.password
    ).then(r => {
      if (r) {
        this.router.navigate(['/dashboard']);
      }
    });

  }
}
