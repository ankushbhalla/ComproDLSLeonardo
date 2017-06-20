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


  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      let questionConfig = this.dataService.getQuestionConfig(this.id);
      this.questionData = questionConfig["question"];
      this.solutionData = questionConfig["solution"];
    });
  }
  ngOnInit() {
    let body = document.getElementsByTagName("body")[0];
    let self = this;
    window.onresize = function (event) {
      body.style.height = window.innerHeight + "px";
      body.style.width = window.innerWidth + "px";
    }
    body.style.height = window.innerHeight + "px";
    body.style.width = window.innerWidth + "px";
  }

  handleCompEvents($event) {
    let eventMap = {
      "CHECK_MY_ANSWER_CLICKED": this.checkAnswer.bind(this),
      "HINT_CLICKED": this.displayHint.bind(this)
    };
    eventMap[$event.eventId]();
  }

  checkAnswer() {
    this.workspace.checkAnswer();
  }

  displayHint(){
    this.workspace.displayHint();
  }
}