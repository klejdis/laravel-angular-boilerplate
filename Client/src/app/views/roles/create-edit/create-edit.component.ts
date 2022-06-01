import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../../../_helpers/must-match.validator";
import {RolesService} from "../../roles/roles.service";
import {NotificationService} from "../../../services/toastr/notification.service";
import {PermissionService} from "../../../services/permissions/permission.service";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateEditComponent implements OnInit{

  id: number;// this one if set we are on edit mode

  permissions:any

  formConfig:any = {
    'name' : ['', Validators.required],
    'slug' : ['', Validators.required],
    'permissions' : this.fb.array([]),
  };

  form: FormGroup = this.fb.group(this.formConfig);


  constructor(
    private activatedRoute: ActivatedRoute,
    private roleService: RolesService,
    private fb: FormBuilder,
    private route: Router,
    private toastr: NotificationService,
    private permissionService: PermissionService,
    private auth: AuthService
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    //get permissions
    this.getPermissions();

    //if in edit mode
    if (this.id){
      //get role
      this.roleService.getRole(this.id)
        .subscribe({
          next: (data: any) => {
            var res = data?.data;

            this.form.patchValue({
             'name': res.name,
             'slug': res.slug,
            });

            this.permissionsArray.map((formControl:AbstractControl) => {
              let found = res.permissions.filter((permission: { module: string; }) => {
                return permission.module == formControl.value.module
              });

               if (found.length){
                 formControl.patchValue({
                   'permissions': found[0].permissions
                 });
               }
            });

          },
          error: (data: any) => {
          },
        });
    }
  }

  async getPermissions(){
    await this.permissionService.get()
      .subscribe({
        next: (data: any) => {
          this.permissions = data.data;
          this.addPermissionFormGroup();
        },
        error: (data: any) => {
        },
      });
  }

  get permissionsArray(){
    return (this.form.controls['permissions'] as FormArray).controls;
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
              this.auth.refresh();

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

              this.auth.refresh();

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


  onRemove($event: any) {
    console.log($event)
  }

  onSelectAll($event: any, index: number, permissions: []) {
    $event.preventDefault();

    (this.form.controls['permissions'] as FormArray).controls[index].patchValue({
      'permissions': permissions
    });
  }

  onSelectAllPermissions($event: any) {
    $event.preventDefault();

    (this.form.controls['permissions'] as FormArray).patchValue(this.permissions);
  }

  onClearAll() {
    this.permissionsArray.map((formControl:AbstractControl) => {
      formControl.patchValue({
        'permissions': []
      });
    });
  }

  private addPermissionFormGroup() {
    const permissions = this.form.get('permissions') as FormArray

    this.permissions.map((module:any) => {
      permissions.push(this.createPermisionFormGroup(module));
    });
  }

  private createPermisionFormGroup(module:any): FormGroup {
    return new FormGroup({
      module : new FormControl(module.module),
      permissions : new FormControl(''),
    });
  }
}
