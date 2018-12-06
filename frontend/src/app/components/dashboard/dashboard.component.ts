import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  preference: String;

  constructor(private authService: AuthService,
  private router: Router) { }
  user: object;
  ngOnInit() {


  }
  onGenrateTest(){

    // const preference=this.preference;
    // console.log("reached Generate Test");
    this.authService.setPreference(this.preference).subscribe(data => {
      if(data.success){
        console.log("success");
        this.router.navigate(['/test']);
      }
      else{
        console.log("failure");
      }
    });
  }

}
