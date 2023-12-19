import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OptionCliProfessComponent } from '../../components/option-cli-profess/option-cli-profess.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user-service.service';
@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit {

  Role:string ='';
  signUpMode: boolean = false;

  username: string = '';
  email: string = '';
  phoneNumber: string = '';
  cinNumber: string = '';
  password: string = '';
  confirmPassword: string = '';
  validationMessages: string[] = [];

  isPasswordValid: boolean = true;
  isEmailValid: boolean = true;
  isPhoneNumberValid: boolean = true;
  isCinNumberValid: boolean = true;
  isNumCinValid: boolean=true;
  isNameValid: boolean=true;
  phoneNumberPattern: RegExp = /^\+(?:[0-9]●?){6,14}[0-9]$/;
  emailPattern: RegExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  constructor(private userService :UserService ,private route: ActivatedRoute,private dialog:MatDialog) {}


  ngOnInit(): void {
    const mode = this.route.snapshot.paramMap.get('mode');
    if(mode == "register_client"){
      this.signUpMode = true ;
      this.Role = "client"
    }
    if(mode == "register_professional"){
      this.signUpMode =true ;
      this.Role = "professionel"
    }

    console.log('Mode:', mode);
  }


  toggleMode() {
    this.signUpMode = !this.signUpMode;

    if (this.signUpMode == true){

      setTimeout(() => {
        // Open the dialog
        const dialogRef = this.dialog.open(OptionCliProfessComponent, {
          width: 'auto',
        });
      }, 3000);

    }
  }


  validateForm() {
    this.isPasswordValid = this.password === this.confirmPassword;
    this.isEmailValid = this.emailPattern.test(this.email);
    this.isPhoneNumberValid = this.phoneNumberPattern.test(this.phoneNumber);
    this.isNumCinValid = /^\d+$/.test(this.cinNumber) && this.cinNumber.trim() !== '';
    this.isNameValid = this.username.trim() !== '' && !/\s/.test(this.username);

  }

  signup() {
this.validateForm() ;
(    this.isPasswordValid &&
  this.isEmailValid &&
  this.isPhoneNumberValid &&
  this.isNumCinValid &&
  this.isNameValid )
{
  var user = {
    username: this.username,
    email: this.email,
    phoneNumber: this.phoneNumber,
    cinNumber: this.cinNumber,
    password: this.password,
    role:this.Role
  };
  console.log(user);

  this.userService.register(user).subscribe(
    success => console.log('User registered',success),
    error => console.log('Registration failed',error)
  );
}
  }
}
