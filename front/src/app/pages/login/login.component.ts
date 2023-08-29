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
    
    




    // ... (same code as before)

    // //Request to server to generate token
    // this.login.generateToken(this.loginData).subscribe(
    //   (data: any) => {
    //     console.log('success');
    //     console.log(data);

    //     // Save token and user details to local storage
    //     this.login.saveTokenAndUser(data.token, data); //token of the object
    //     console.log(this.login.getToken())
        

    //     // Determine navigation based on user roles
    //     const userRoles = data.roles; // Assuming roles are sent in the API response
    //     if (userRoles.includes('ROLE_ADMIN')) {
          
    //       this.router.navigate(['admin']);
    //     } else if(userRoles.includes('ROLE_USER')){
          
    //       this.router.navigate(['user-dashboard/0']);
    //     }else{
    //       this.login.logout();

    //     }
          
    //   },
    //   (error) => {
    //     console.log('Error!');
    //     console.log(error);
    //     this.snack.open("Invalid Details!!! Try again",'',{
    //       duration:3000,
    //     });
    //   }

         
    // );

    

}
}
