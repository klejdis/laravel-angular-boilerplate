import { Injectable} from "@angular/core";
import {HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RolesService{

  constructor(private http: HttpClient) {
  }

  getAllRoles(){
    return this.http.get('http://localhost/api/roles');
  }

}
