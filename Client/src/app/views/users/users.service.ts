import { Injectable} from "@angular/core";
import {HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable()
export class UsersService{

  constructor(private http: HttpClient) {
  }

  getUsers(page: number){
    return this.http.get(environment.url.base_url+'/api/users?page=' + page);
  }

  storeUser(user: any): Observable<any> | void | null{
    return this.http.post(environment.url.base_url+'/api/users/store',user);
  }

  deleteUser(id: number){
    return this.http.delete(environment.url.base_url+'/api/users/'+id+'/destroy');
  }
}
