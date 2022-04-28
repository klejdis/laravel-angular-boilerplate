import { Injectable} from "@angular/core";
import {HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable()
export class UsersService{

  constructor(private http: HttpClient) {
  }

  getUsers(){
    return this.http.get('http://localhost/api/users');
  }
}
