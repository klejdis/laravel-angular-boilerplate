import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {MustMatch} from "../../../_helpers/must-match.validator";
import {RolesService} from "../../roles/roles.service";
import {NotificationService} from "../../../services/toastr/notification.service";

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateEditComponent implements OnInit {

  id: number;// this one if set we are on edit mode

  form = this.fb.group({
    'name' : ['', Validators.required],
    'slug' : ['', Validators.required],
  });


  constructor(
    private activatedRoute: ActivatedRoute,
    private roleService: RolesService,
    private fb: FormBuilder,
    private route: Router,
    private toastr: NotificationService
  ) { }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.params['id'];


    if (this.id){
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

}
