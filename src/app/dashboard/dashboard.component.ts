import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  questions: Array<Object>;
  constructor() {
    this.questions = [
      {
        mode: "Side By Side View"
      },
      {
        mode: "Vertical Scroll (Reading View)"
      },
      {
        mode: "Vertical Scroll (Without Ribbon)"
      }];
  }
  ngOnInit() {
  }

}
