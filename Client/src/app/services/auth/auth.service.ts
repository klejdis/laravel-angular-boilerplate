import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {PermissionService} from "../permissions/permission.service";
import {convertLegacyBorder} from "ag-grid-enterprise/dist/lib/excelExport/assets/excelLegacyConvert";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  options: any;

  permissions: any;

  constructor(
    private http: HttpClient,
    private permissionService: PermissionService
  ) {
    this.options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };

  }

  /**
   * Get an access token
   * @param e The email address
   * @param p The password string
   */
  async login(e: string, p: string):Promise<boolean> {
    return  await this.authenticate(e, p);
  }

  async authenticate(e: string, p: string): Promise<boolean>{
    await this.http.post(environment.url.base_url + '/api/login', {
      email: e,
      password: p,
    }).subscribe({
      next: (data: any) => {
        localStorage.setItem('access_token', data.data);
      },
      error: (data: any) => {

      }
    });

    return localStorage.getItem('access_token') !==  null ;
  }

  /**
   * Revoke the authenticated user token
   */
  logout() {
    this.options.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token');
    localStorage.removeItem('access_token');
  }

   async can(permission: string): Promise<boolean> {
    console.log(this.permissions)

     if (this.permissions == undefined) {
       let data = <any>await firstValueFrom(this.permissionService.getUserPermissions());
       this.permissions = data.data;
     }

     return this.permissions[permission] != undefined;
   }

   refresh(){
    this.permissions = null;
   }


}
