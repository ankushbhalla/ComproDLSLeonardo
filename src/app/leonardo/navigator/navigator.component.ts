import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LeonardoCoreService } from '../../leonardo-core.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {
  @Output() navEvent: EventEmitter<Object> = new EventEmitter();
  @Input() navigatorData: any;
  answerButtonMode;
  submitButtonMode;
  constructor(private router: Router, private leonardoCoreService: LeonardoCoreService) {
      this.answerButtonMode = "checkAnswer";
      this.submitButtonMode = "submit";
  }

  ngOnInit() {
    console.log(this.navigatorData);
  }

  checkMyAnswer() {
    if(this.answerButtonMode == "checkAnswer"){
      this.navEvent.emit({ eventId: "CHECK_MY_ANSWER_CLICKED" });
      this.answerButtonMode = "tryAgain"
    }
    else if(this.answerButtonMode == "tryAgain"){
      this.navEvent.emit({eventId:"TRY_AGAIN_CLICKED"});
      this.answerButtonMode = "checkAnswer";
    }
    
  }

  displayHint() {
    this.navEvent.emit({ eventId: "HINT_CLICKED" });
  }

  launchEbook() {
    this.navEvent.emit({ eventId: "STUDY_CLICKED" });
  }

  handleSubmitClick() {
    if(this.submitButtonMode == "submit"){
      this.submitButtonMode = "close";
      this.navEvent.emit({ eventId: "CHECK_MY_ANSWER_CLICKED" });
    }
    else{
      //this.leonardoCoreService.removeWidgets();
      this.router.navigate(['/dashboard']);
    }
  }
  checkvisiblity(mode) {
    if (mode == true) {
      return "visible"
    }
    else {
      return "hidden"
    }
  }
}
