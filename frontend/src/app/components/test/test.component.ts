import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  questions$: Array<any>;
  answers: number[];  

  constructor (
    private authService: AuthService,
    private router: Router,
    private flashMessageService: FlashMessagesService
  ) {  }

  ngOnInit() {
    this.generateTest()
  }
  generateTest(){
    console.log("gentest initiate")
    this.authService.generateTest().subscribe(data => {

      if(data.success){
        this.questions$ = JSON.parse(JSON.stringify(data.questions), (key, value) => 
          key === "options" ? JSON.parse(value) : value
        );

        this.answers = new Array(this.questions$.length + 2).fill(0);
        console.log(this.questions$);

        for (var _i = 0; _i < this.questions$.length; _i++) {
          // this.answers[_i] = this.questions$[_i].options[0].flag;
          this.answers[_i] = (this.questions$[_i].options[0].flag == '1') ? 1 : 0;
        }
      }
      else{
        console.log("failure");
      }
    });
  }

  onOptionChange(option_flag, question_idx) {
    this.answers[question_idx] = (option_flag == '1') ? 1 : 0;
    console.log(option_flag + " " + question_idx);
  }

  onTestSubmit() {

    let correct_answers: number = 0;
    for (var _i = 0; _i < this.questions$.length; _i++) {
      correct_answers = correct_answers + this.answers[_i];
    }
    console.log(correct_answers);

    let correct_perc = correct_answers / this.questions$.length * 100;
    if (correct_perc < 10) {
      this.authService.setPreferenceSuitable(false);
    } else {
      this.authService.setPreferenceSuitable(true);
    }

    this.router.navigate(['/results']);
  }

}
