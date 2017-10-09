import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

declare var Leonardo: any;

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {
  @Output() navEvent: EventEmitter<Object> = new EventEmitter();
  @Input() navigatorData: any;
  answerButtonMode;
  constructor(private router: Router) {
      this.answerButtonMode = "checkAnswer";
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
    this.navEvent.emit({ eventId: "CHECK_MY_ANSWER_CLICKED" });
    //Leonardo.scripts.destroyGrids();
    //this.router.navigate(['/dashboard']);
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
