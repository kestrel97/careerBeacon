import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(user.username == undefined || user.std_password == undefined || user.percentage == undefined || user.background == undefined){
      return false;
    } else {
      return true;
    }
  }
  validateLogin(user) {
      return (user.username != undefined && user.std_password != undefined);
    }

}
