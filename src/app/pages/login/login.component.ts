import { EncryptServiceService } from './../../utils/EncryptService/encrypt-service.service';
import { LoginRequestModel } from './../../models/Account/LoginRequestModel';
import { EngSvcApiService } from './../../utils/EngSvcApi/eng-svc-api.service';
import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { AppService } from '../../utils/services/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginResponseModel } from 'src/app/models/Account/LoginResponseModel';
import { ErrorModel } from 'src/app/models/Common/ErrorModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isAuthLoading = false;
  publicKey: string;
  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private engSvcApi: EngSvcApiService,
    private appService: AppService,
    private router: Router,
    private encryptService: EncryptServiceService
  ) {

    console.log("login")
  }

  ngOnInit() {
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    this.loginForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      rememberMe: new FormControl(false),
    });


  }

  login() {
    console.log("login");

    if (this.loginForm.valid) {
      this.isAuthLoading = true;

      var loginReq = new LoginRequestModel();
      loginReq.UserName = this.loginForm.get('userName').value;
      loginReq.Password = this.loginForm.get('password').value;
      this.doLogin(loginReq);

      // this.engSvcApi.GetPublicKey().subscribe(async response => {
      //   if (response.Error.ErrorCode == "200") {

      //     this.isAuthLoading = false;
      //     var loginReq = new LoginRequestModel();
      //     this.publicKey = response.PublicKey;
      //     loginReq.UserName = this.loginForm.get('userName').value;
      //     loginReq.Password = this.encryptService.EncryptText(this.loginForm.get('password').value, response.PublicKey);
      //     this.doLogin(loginReq);

      //   } else {
      //     this.isAuthLoading = false;
      //     this.toastr.error('Login', response.Error.ErrorMessage);

      //   }
      // },
      //   async error => {
      //     this.isAuthLoading = false;
      //     this.toastr.error('Login', 'ConnectionError');

      //   });
    } else {
      this.toastr.info('Login', 'Please fill login fields', { positionClass: 'toast-top-right', timeOut: 2000 });
    }
  }

  private doLogin(loginReq: LoginRequestModel) {
    if (loginReq.UserName == "melamin" && loginReq.Password == "0000") {
      var response = new LoginResponseModel();
      response.Name = "Mohamed Elamin";
      response.UserName = "melamin";
      response.Location = "HQ";
      response.Type = "ADMIN";
      var error = new ErrorModel();
      error.ErrorCode = "200";
      error.ErrorMessage = "Success";
      error.ErrorMessageAr = "Success";
      localStorage.setItem("userInfo", JSON.stringify(response));
      localStorage.setItem("isLoggedIn", "true");
      this.toastr.success("Logged in Successfully", "", { positionClass: 'toast-top-right', timeOut: 2000, });
      // this.router.navigate(['/']);
      this.isAuthLoading = false;
      this.router.navigate(['/dashboard']);

    }
    else {
      this.isAuthLoading = false;
      this.toastr.error("Invalid credentials, please check your username or password", "", { positionClass: 'toast-top-right', timeOut: 2000 });
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
  }
}
