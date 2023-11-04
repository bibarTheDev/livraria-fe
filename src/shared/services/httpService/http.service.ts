import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  get(a: string){
    return "got " + a;
  }
  
  post(a: string){
    return "posted " + a;
  }
  
  put(a: string){
    return "put " + a;
  }
  
  patch(a: string){
    return "patched " + a;
  }
  
  delete(a: string){
    return "deleted " + a;
  }
}
