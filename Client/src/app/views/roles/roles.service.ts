import { Injectable} from "@angular/core";
import {HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class RolesService{

  constructor(private http: HttpClient) {
  }

  getAllRoles(){
    return this.http.get(environment.url.base_url+'/api/roles');
  }

}
