import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http: HttpClient) { }

  get(url: string){
    return this.http.get(url)
  } 
  
  post(url: string){
    return ;
  }
  
  put(url: string){
    return ;
  }
  
  patch(url: string){
    return ;
  }
  
  delete(url: string){
    return ;
  }
}
