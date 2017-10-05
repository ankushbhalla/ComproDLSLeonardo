import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

declare var window;
declare var document;
@Component({
  selector: 'app-leonardo',
  templateUrl: './leonardo.component.html',
  styleUrls: ['./leonardo.component.scss']
})
export class LeonardoComponent implements OnInit {

  @ViewChild('contentWrapper') contentWrapper;
  @ViewChild('workspace') workspace;
  questionData: any;
  solutionData: any;
  id: string;
  private sub: any;
  navigatorData: any;
  mode:string;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.mode = params['mode'];
      let questionConfig = this.dataService.getQuestionConfig(this.mode, this.id);
      this.questionData = questionConfig["question"];
      this.solutionData = questionConfig["solution"];
    });
    this.navigatorData = {
      hint: {
        isLastHint: false
      },
      showCheckAnswer: this.checkmode(this.mode),
      showHintButton: this.checkmode(this.mode),
      showSubmitButton:true
    }
  }
  ngOnInit() {
  }

  handleCompEvents($event) {
    let eventMap = {
      "CHECK_MY_ANSWER_CLICKED": this.checkAnswer.bind(this),
      "HINT_CLICKED": this.displayHint.bind(this),
      "RETRY_CLICKED": this.retryAnswer.bind(this),

    };
    eventMap[$event.eventId]();
  }

  checkAnswer() {
    this.workspace.checkAnswer();
  }

  retryAnswer() {
    this.workspace.retryAnswer();
  }

  displayHint(){
    this.workspace.displayHint();
  }

  handleGridEvent($event) {
    this.navigatorData.hint.isLastHint = $event.hint.isLastHint;
  }
  checkmode(mode){
    if(mode == "Assessment"){
      return false;
    }
    else{
      return true;
    }
  }
}
