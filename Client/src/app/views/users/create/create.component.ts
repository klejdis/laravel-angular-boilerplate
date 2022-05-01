import { Component, OnInit } from '@angular/core';
import { Injectable} from "@angular/core";
import {UsersService} from "../users.service";
import {FormBuilder, FormControl, FormGroup, FormsModule, Validator, Validators} from "@angular/forms";
import {User} from "../models/user.interface";
import {MustMatch} from "../../../_helpers/must-match.validator";
import { Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createUserForm = this.fb.group({
    'first_name' : ['', Validators.required],
    'last_name' : ['', Validators.required],
    'email' : ['', Validators.required],
    'password' : ['', Validators.required],
    'password_confirmation' : ['', Validators.required],
    'is_activated' : [true, Validators.required],
  },{
    validator: MustMatch('password', 'password_confirmation')
  });

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder,
    private route: Router
  ) {

  }

  ngOnInit(): void {
  }

  onSubmit(){
    // @ts-ignore
    this.usersService.storeUser( this.createUserForm?.value )
      .subscribe((data: any) => {
        console.log(data);
        if (data.errors == false){
          this.route.navigate(['/users/index']);
        }
      });

  }


}
