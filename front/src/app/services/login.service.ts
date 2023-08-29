import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Subject } from 'rxjs';
import { Observable } from '@ckeditor/ckeditor5-utils';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = environment.baseUrl;

  //public loginStatusSubject = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  public generateToken(loginData: any) {
    return this.http.post(`${this.baseUrl}/auth/signin`, loginData, httpOptions);
  }

  // Save token and user details to local storage
  public saveTokenAndUser(accessToken: string, user: any) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Get token from local storage
  public getToken() {
    return localStorage.getItem('accessToken');
  }

  // Get user details from local storage
  public getUser() {
    let userString = localStorage.getItem('user');
    //return userString ? JSON.parse(userString) : null;

    //let userStr = localStorage.getItem("user");
  if(userString!=null)
  {
      return JSON.parse(userString);
  }else{
    this.logout();
    return null;
  }
  }

    //isLogin:user is logged in or not
   public isLoggedIn(){
    let tokenStr=localStorage.getItem('accessToken');
    //this.loginStatusSubject.next(true);
    if(tokenStr==undefined || tokenStr == '' || tokenStr == null)
    {
      return false;
    }else{
      return true;
    }
   }

  // Clear token and user details from local storage on logout
  public logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  }
}
