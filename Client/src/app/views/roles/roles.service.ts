import { Injectable} from "@angular/core";
import {HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable()
export class RolesService{

  constructor(private http: HttpClient) {
  }

  getRoles(page: number){
    return this.http.get('http://localhost/api/roles?page=' + page);
  }

}
