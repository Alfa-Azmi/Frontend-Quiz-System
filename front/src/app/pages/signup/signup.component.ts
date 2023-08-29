import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  errorMessage:any;

  constructor(private userService:UserService,
    private router:Router,
    private snack:MatSnackBar){}
  public user ={
  
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email:'',
    phone:'',
  };

  formSubmit(){
    //alert('submit');
    console.log(this.user);
    if(this.user.username =='' || this.user.username == null){
      //alert('User is required!!');
      this.snack.open('Username is required!!','',{
        duration:3000,
      })
      return;
       
    }

    if(this.user.password =='' || this.user.password == null){
      //alert('User is required!!');
      this.snack.open('Password is required!!','',{
        duration:3000,
      })
      return;
       }

    if (this.user.password.length < 6) {
        this.snack.open('Password should be at least 6 characters long!', '', {
            duration: 3000,
        });
        return;
    }
    if(this.user.firstName =='' || this.user.firstName == null){
      
      this.snack.open('First name is required!!','',{
        duration:3000,
      })
      return;
    }
    if(this.user.lastName =='' || this.user.lastName == null){
      
      this.snack.open('Last name is required!!','',{
        duration:3000,
      })
      return;
    }
    if (this.user.email === '' || this.user.email === null) {
      this.snack.open('Email is required!!', '', {
          duration: 3000,
      });
      return;
    }

  // Regular expression to validate email format
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailPattern.test(this.user.email)) {
      this.snack.open('Please Enter A Valid Email!', '', {
          duration: 3000,
      });
      return;
  }

  if (this.user.phone === '' || this.user.phone === null) {
    this.snack.open('Phone number is required!!', '', {
        duration: 3000,
    });
    return;
  }

// // Check if phone number has maximum 10 digits
// //const phoneNumber = this.user.phone.toString();
if (this.user.phone.length < 10) {
  console.log(this.user.phone.length);
    this.snack.open('Phone number should have a maximum of 10 digits!', '', {
        duration: 3000,
    });
    return;
  }


    
    //addUser: userservice
    this.userService.addUser(this.user).subscribe(
    
    {
      next:(res:any)=>{
        console.log('res',res);

                Swal.fire('Successfully done!','username is  ' + this.user.username,'success');
        this.router.navigate(['login']);
      },
      error: err => {
        this.errorMessage = err.error.message;
       
        console.log('Error!');
        console.log(err);
        Swal.fire(err.error.message);
      }    
        
      }    
      
) 
}

}
