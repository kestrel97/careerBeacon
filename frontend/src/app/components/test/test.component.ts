import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  questions$: Object;

  constructor (
    private authService: AuthService,
    private router: Router
  ) {  }

  ngOnInit() {
    this.generateTest()
  }
  generateTest(){
    console.log("gentest initiate")
    this.authService.generateTest().subscribe(data => {

      if(data.success){ 
        this.questions$ = JSON.parse(JSON.stringify(data.questions));

      }
      else{
        console.log("failure");
      }
    });
  }

}
