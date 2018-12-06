import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;
  broad: any;
  public isSuitable: boolean;
  constructor(private http: Http) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
      .pipe(map(res => res.json()))
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
      .pipe(map(res => res.json()))
  }


  setPreference(preference){

    this.broad=preference;
    let headers = new Headers();
    let name= JSON.parse(localStorage.getItem('user'));
    let username= name['username'];
    console.log(username);
    preference = {
      preference: preference,
      name: username
    }
    headers.append("Content-Type", "application/json");
    return this.http.post('http://localhost:3000/users/setPreference', preference, {headers: headers})
      .pipe(map(res => res.json()))
  }

  setPreferenceSuitable(isSuitable) {
    this.isSuitable = isSuitable;
  }

  fetchSuitableUni() {
    const user = JSON.parse(localStorage.getItem('user'));
    let headers = new Headers();
    let data = {
      bfid: this.broad,
      percentage: user.percentage
    }

    console.log(this.broad);
    headers.append("Content-Type", "application/json");

    return this.http.post('http://localhost:3000/users/fetchSuitableUni', data, {headers: headers})
      .pipe(map(res => res.json()))
  }

  generateTest(){
    // console.log(this.broad)
    let headers = new Headers();
    let data = {
      bfid: this.broad
    }

    console.log(data);

    headers.append("Content-Type", "application/json");

    return this.http.post('http://localhost:3000/users/generateTest', data, {headers: headers})
      .pipe(map(res => res.json()))
  }
  // getProfile() {
  //   let headers = new Headers();
  //   this.loadToken();
  //   headers.append("Authorization", this.authToken);
  //   headers.append("Content-Type", "application/json");
  //   return this.http.get('http://localhost:3000/users/profile', {headers: headers})
  //     .pipe(map(res => res.json()))
  // }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  isLoggedIn() {
    const jwtHelperService = new JwtHelperService();
    return !jwtHelperService.isTokenExpired(localStorage.getItem('id_token'));
  }
}
