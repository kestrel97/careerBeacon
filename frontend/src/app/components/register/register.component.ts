import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username:String;
  std_password:String;
  background:String;
  percentage:Number;

  constructor(private validationService: ValidateService,
  private flashMessage: FlashMessagesService,
  private authService: AuthService,
  private router: Router) { }

  ngOnInit() {
  }
  onRegisterSubmit(){
    const user = {
      username: this.username,
      std_password: this.std_password,
      background: this.background,
      percentage: this.percentage
    }

    // Required Fields
    if(!this.validationService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register user
   this.authService.registerUser(user).subscribe(data => {
     if(data.success){
       this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
       this.router.navigate(['/login']);
     }
     else{
       this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
       this.router.navigate(['/register']);
     }
   });
  }

}
