import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {MustMatch} from "../../../_helpers/must-match.validator";
import {UsersService} from "../users.service";
import {RolesService} from "../../roles/roles.service";
import {NotificationService} from "../../../services/toastr/notification.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id: number;

  roles: Array<any>;
  selectedRole: number;

  form = this.fb.group({
    'first_name' : ['', Validators.required],
    'last_name' : ['', Validators.required],
    'email' : [''],
    'password' : ['',],
    'password_confirmation' : [''],
    'is_activated' : [true, Validators.required],
    'roles' : ['', Validators.required],
  },{
    validator: MustMatch('password', 'password_confirmation')
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private roleService: RolesService,
    private fb: FormBuilder,
    private route: Router,
    private toastr: NotificationService
  ) {

  }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.params['id'];

    this.roleService.getAllRoles()
      .subscribe((data: any) => {
        this.roles = data.data;
      });


    this.usersService.getUser(this.id)
      .subscribe({
        next: (data: any) => {
          this.form.patchValue(data?.data);
        },
        error: (data: any) => {

        },
      });



  }

  onSubmit(){

    // @ts-ignore
    this.usersService.updateUser(
        this.id,
        this.form?.value
      )
        .subscribe({
          next: (data: any) => {
            if (data.errors == false){
              this.toastr.showSuccess(data.message, '');
              this.route.navigate(['/users/index']);
            }else{
              this.toastr.showError(data?.message, '');
            }
          },
          error: (data: any) => {
            this.toastr.showError(data?.error.message, '');

          }
        });

  }

}
