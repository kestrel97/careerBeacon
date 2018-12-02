import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService) { }
  user: object;
  ngOnInit() {
    // this.authService.getProfile().subscribe( profile => {
    //   this.user = profile.user;
    //
    // },
    // err => {
    //   console.log(err);
    //   return false;
    // });
  }

}
