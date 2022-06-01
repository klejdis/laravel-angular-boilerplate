import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BaseClientService} from "../api/client/base-client.service";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends BaseClientService{

  override get_url:string = '/permissions';

   getUserPermissions() {
     return this.http.get(this.base_url + '/permissions/user');
   }

}
