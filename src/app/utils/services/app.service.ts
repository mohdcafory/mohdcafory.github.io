import { LoginResponseModel } from './../../models/Account/LoginResponseModel';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public user : LoginResponseModel ;

  constructor(private router: Router) { 
  }

  setUserInfo(userInfo: string)
  {
    localStorage.setItem("userInfo", userInfo);
  }


  getUserInfo(){
    this.user = JSON.parse(localStorage.getItem("userInfo"));
    // this.user.image ='assets/img/manager.png';
    return this.user;
  }
  

  login(userInfo: string) {
    localStorage.setItem("userInfo", userInfo);
    localStorage.setItem("isLoggedIn", "truee");
  }

  register() {
    localStorage.setItem('token', 'LOGGED_IN');
    this.router.navigate(['/']);
  }

  logout() {
    localStorage.setItem("userInfo", null);
    localStorage.setItem("isLoggedIn", "false");
    this.router.navigate(['/login']);
  }
}

