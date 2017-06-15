import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {
  @Output() checkAnswer: EventEmitter<Object> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  checkMyAnswer(){
    this.checkAnswer.emit({eventId:"CHECK_MY_ANSWER_CLICKED"});
  }

}
