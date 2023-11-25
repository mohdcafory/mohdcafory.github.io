import { Component } from '@angular/core';
import { AppService } from './utils/services/app.service';
import { log } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'adminlte';
  /**
   *
   */
  constructor(private appService: AppService,
    private router: Router) {
    this.init();
  }

  init() {
    if (this.appService.getUserInfo() == null) {
      this.router.navigateByUrl("login");
    }
    else {
      this.router.navigateByUrl("dashboard");
    }
  }
}
