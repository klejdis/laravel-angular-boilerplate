import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BaseClientService {

  base_url:string =  environment.url.base_url + '/api';

  get_url:string = '';

  constructor(
    protected http: HttpClient
  ) { }

  get(){
    return this.http.get(this.base_url+this.get_url);
  }
}
