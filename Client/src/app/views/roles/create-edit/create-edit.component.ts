import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {MustMatch} from "../../../_helpers/must-match.validator";
import {RolesService} from "../../roles/roles.service";
import {NotificationService} from "../../../services/toastr/notification.service";
import {PermissionService} from "../../../services/permissions/permission.service";

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateEditComponent implements OnInit {

  id: number;// this one if set we are on edit mode
  permissions:any

  form = this.fb.group({
    'name' : ['', Validators.required],
    'slug' : ['', Validators.required],
    'permissions' : ['', Validators.required],
  });


  constructor(
    private activatedRoute: ActivatedRoute,
    private roleService: RolesService,
    private fb: FormBuilder,
    private route: Router,
    private toastr: NotificationService,
    private permissionService: PermissionService
  ) { }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.params['id'];

    //get permissions
    this.permissionService.get()
      .subscribe({
        next: (data: any) => {
          this.permissions = data.data;
        },
        error: (data: any) => {

        },
      });


    if (this.id){
      //get role
      this.roleService.getRole(this.id)
        .subscribe({
          next: (data: any) => {
            this.form.patchValue(data?.data);
          },
          error: (data: any) => {

          },
        });

    }
  }

  onSubmit(){

    if (!this.id){
      // @ts-ignore
      this.roleService.store(
        this.form?.value
      )
        .subscribe({
          next: (data: any) => {
            if (data.errors == false){
              this.toastr.showSuccess(data.message, '');
              this.route.navigate(['/roles/index']);
            }else{
              this.toastr.showError(data?.message, '');
            }
          },
          error: (data: any) => {
            this.toastr.showError(data?.error.message, '');

          }
        });
    }else{
      // @ts-ignore
      this.roleService.update(
        this.id,
        this.form?.value
      )
        .subscribe({
          next: (data: any) => {
            if (data.errors == false){
              this.toastr.showSuccess(data.message, '');
              this.route.navigate(['/roles/index']);
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

  onChange($event: any) {

    //filter the event for unique values
    $event =  $event.filter( (permission:any) => {
      if(this.form.controls['permissions'].value){
        let found = this.form.controls['permissions'].value.find( (obj: any) =>{
          return obj.value == permission.value;
        });
        return found == undefined;
      }else{
        return true
      }
    });

    this.form.controls['permissions'].patchValue(
       [
         ...$event,
         ...this.form.controls['permissions'].value
       ]);

  }
}
