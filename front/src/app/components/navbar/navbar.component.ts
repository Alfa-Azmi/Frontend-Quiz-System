import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router'; // Import the Router service

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  // isLoggedIn=false;
  // user=null;
  constructor(public login:LoginService,private router: Router){}

  // this.isLoggedIn=this.login.isLoggedIn();
  // this.user=this.login.getUser();
  // this.login.loginStatusSubject.asObservable().subscribe(data=>{
  //   this.isLoggedIn=this.login.isLoggedIn();
  // this.user=this.login.getUser();
  // });

  public logout(){
    this.login.logout();
    //window.location.reload();
    //this.isLoggedIn=false;
    //this.user=null;
    this.router.navigate(['/login']); // Navigate to the login page after logging out
  }

}
