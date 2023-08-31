import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class adminGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
      const user = this.loginService.getUser();
      if (user && user.roles.includes('ROLE_ADMIN')) {
        // Check if the user has the required role (e.g., 'ROLE_ADMIN')
        return true;
      } else {
        this.router.navigate(['']); // Redirect to unauthorized page
        return false;
      }
    
  }
}


    
