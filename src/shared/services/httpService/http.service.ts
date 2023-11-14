import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

    return this.http.post(url, body, options);
  }

  put(url: string, body?: Object, headers?: any){
    let options: any = { };
    headers ? options["headers"] = new HttpHeaders(headers) : false;

    return this.http.put(url, body, options);
  }

  patch(url: string, body?: Object, headers?: any){
    let options: any = { };
    headers ? options["headers"] = new HttpHeaders(headers) : false;

    return this.http.patch(url, body, options);
  }

  delete(url: string, headers?: any){
    let options: any = { };
    headers ? options["headers"] = new HttpHeaders(headers) : false;

    return this.http.delete(url, options);
  }
}
