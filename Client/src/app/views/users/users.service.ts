import { Injectable} from "@angular/core";
import {HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable()
export class UsersService{

  constructor(private http: HttpClient) {
  }

  getUsers(page: number){
    return this.http.get('http://localhost/api/users?page=' + page);
  }

  storeUser(user: any): Observable<any> | void | null{
    return this.http.post('http://localhost/api/users/store',user);
  }
}
