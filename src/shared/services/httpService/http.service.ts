import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public  http: HttpClient) { }

  get(url: string, headers?: any){
    let options: any = { };
    headers ? options["headers"] = new HttpHeaders(headers) : false;
    
    return this.http.get(url, options);
  }

  post(url: string, body?: Object, headers?: any){
    let options: any = { };
    headers ? options["headers"] = new HttpHeaders(headers) : false;
    
    return this.http.post<any>(url, String(body), options);
  }
  
  put(url: string, body?: Object, headers?: any){
    let options: any = { };
    headers ? options["headers"] = new HttpHeaders(headers) : false;
    
    return this.http.put(url, String(body), options);
  }
  
  patch(url: string, body?: Object, headers?: any){
    let options: any = { };
    headers ? options["headers"] = new HttpHeaders(headers) : false;
    
    return this.http.patch(url, String(body), options);
  }
  
  delete(url: string, headers?: any){
    let options: any = { };
    headers ? options["headers"] = new HttpHeaders(headers) : false;
    
    return this.http.delete(url, options);
  }
}
