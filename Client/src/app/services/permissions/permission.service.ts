import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BaseClientService} from "../api/client/base-client.service";

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends BaseClientService{

  override get_url:string = '/permissions';

}
