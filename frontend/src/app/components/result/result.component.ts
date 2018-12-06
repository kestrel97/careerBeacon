import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  isSuitable: boolean = false;
  unis$: Array<any>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isSuitable = this.authService.isSuitable;
    if (this.isSuitable) {
      this.authService.fetchSuitableUni().subscribe(data => {
        if(data.success) {
          this.unis$ = data.unis;
          console.log(this.unis$);
        } else {
          console.log(data.msg);
        }
      });
    } else {
      this.unis$ = null;
    }
  }

}
