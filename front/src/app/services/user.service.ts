import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  //add user

  public addUser(user:any){
    return this.http.post(`${this.baseUrl}/auth/signup`,user);

  }

  public users() {
    return this.http.get(`${this.baseUrl}/auth/`);
  }
}
