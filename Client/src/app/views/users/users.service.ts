import { Injectable} from "@angular/core";
import {HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable()
export class UsersService{

  constructor(private http: HttpClient) {
  }

  getUser(id: number){
    return this.http.get(environment.url.base_url+'/api/users/'+id+'/show');
  }

  getUsers(page: number, options: any){
    return this.http.post(environment.url.base_url+'/api/users?page=' + page, options);
  }

  storeUser(user: any): Observable<any> | void | null{
    return this.http.post(environment.url.base_url+'/api/users/store',user);
  }

  updateUser(id: number, user: any): Observable<any> | void | null{
    return this.http.patch(environment.url.base_url+'/api/users/'+id+'/update',user);
  }

  deleteUser(id: number){
    return this.http.delete(environment.url.base_url+'/api/users/'+id+'/destroy');
  }
}
