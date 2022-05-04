import { Component, OnInit } from '@angular/core';
import { Injectable} from "@angular/core";
import {UsersService} from "../users.service";
import {FormBuilder, FormControl, FormGroup, FormsModule, Validator, Validators} from "@angular/forms";
import {User} from "../models/user.interface";
import {MustMatch} from "../../../_helpers/must-match.validator";
import { Router} from "@angular/router";
import {RolesService} from "../../roles/roles.service";
import {NotificationService} from "../../../services/toastr/notification.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  roles: Array<any>;
  selectedRole: number;

  createUserForm = this.fb.group({
    'first_name' : ['', Validators.required],
    'last_name' : ['', Validators.required],
    'email' : ['', Validators.required],
    'password' : ['', Validators.required],
    'password_confirmation' : ['', Validators.required],
    'is_activated' : [true, Validators.required],
    'roles' : ['', Validators.required],
  },{
    validator: MustMatch('password', 'password_confirmation')
  });

  constructor(
    private usersService: UsersService,
    private roleService: RolesService,
    private fb: FormBuilder,
    private route: Router,
    private toastr: NotificationService
  ) {

  }

  ngOnInit(): void {
    this.roleService.getAllRoles()
      .subscribe((data: any) => {
        this.roles = data.data;
      });
  }

  onSubmit(){
    // @ts-ignore
    this.usersService.storeUser( this.createUserForm?.value )
      .subscribe({
        next: (data: any) => {
          console.log(data.errors);
          console.log(data.errors == false);

          if (data.errors == false){
            this.toastr.showSuccess(data.message, '');
            this.route.navigate(['/users/index']);
          }else{
            this.toastr.showError(data?.message, '');
          }
        },
        error: (data: any) => {
          console.log(data);
          this.toastr.showError(data?.error.message, '');

        }
      });

  }


}
