import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {
  @Output() navEvent: EventEmitter<Object> = new EventEmitter();
  @Input() navigatorData: any;
  constructor() { }

  ngOnInit() {
  }

  checkMyAnswer(){
    this.navEvent.emit({eventId:"CHECK_MY_ANSWER_CLICKED"});
  }

  displayHint(){
    this.navEvent.emit({eventId:"HINT_CLICKED"});
  }

}
