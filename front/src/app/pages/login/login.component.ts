import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    username: '',
    password: '',
  };

  errorMessage:any;
  token:any;
  roles:any;
  

  constructor(private snack: MatSnackBar, private login: LoginService,private router:Router) {}

  formSubmit() {
    console.log("login btn clicked");

    if(this.loginData.username =='' || this.loginData.username == null){
      this.snack.open('Username is required!!','',{
        duration:3000,
      })
      return;
       
    }

    if(this.loginData.password =='' || this.loginData.password == null){
      this.snack.open('Password is required!!','',{
        duration:3000,
      })
      return;
    }

    this.login.generateToken(this.loginData).subscribe({
      next: (res:any) => {
        console.log('res',res);
        this.login.saveTokenAndUser(res.token, res);
        console.log(this.login.getToken());
        console.log(this.login.getUser())
        
        
        const userRoles = res.roles; 
        if (userRoles.includes('ROLE_ADMIN')) {
  
          this.router.navigate(['admin']);
        } else if(userRoles.includes('ROLE_USER')){

          
          this.router.navigate(['user-dashboard/0']);
        }else{
          this.login.logout();

        }
      },
      error: err => {
        this.errorMessage = err.error.message;
       
        console.log('Error!');
        console.log(err);

        this.snack.open(err.error.message,'',{
                duration:3000,
              });
      }    
  });
            
}
}
