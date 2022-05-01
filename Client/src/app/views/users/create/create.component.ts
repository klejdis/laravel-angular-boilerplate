import { Component, OnInit } from '@angular/core';
import { Injectable} from "@angular/core";
import {UsersService} from "../users.service";
import {FormBuilder, FormControl, FormsModule, Validator, Validators} from "@angular/forms";
import {User} from "../models/user.interface";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  formIsValidated: boolean = false;

  user: User;

  createUserForm = this.fb.group({
    'firstName' : ['', Validators.required]
  });

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder,
  ) {

  }

  ngOnInit(): void {


  }

  onSubmit(){
  }

}
