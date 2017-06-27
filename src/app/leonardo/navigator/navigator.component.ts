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
  constructor(private router: Router) { }

  ngOnInit() {
  }

  checkMyAnswer(){
    this.navEvent.emit({eventId:"CHECK_MY_ANSWER_CLICKED"});
  }

  displayHint(){
    this.navEvent.emit({eventId:"HINT_CLICKED"});
  }

  handleSubmitClick() {
    Leonardo.scripts.destroyGrids();
    this.router.navigate(['/dashboard']);
  }
}
