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

  getRoles(page: number, options: any = null){
    return this.http.post(environment.url.base_url+'/api/roles/paginated?page='+page, options);
  }

  getRole(id: number){
    return this.http.get(environment.url.base_url+'/api/roles/'+id+'/show');
  }

  store(data: any): Observable<any> | void | null{
    return this.http.post(environment.url.base_url+'/api/roles/store',data);
  }

  update(id: number, data: any): Observable<any> | void | null{
    return this.http.patch(environment.url.base_url+'/api/roles/'+id+'/update',data);
  }

  delete(id: number){
    return this.http.delete(environment.url.base_url+'/api/roles/'+id+'/destroy');
  }

}
