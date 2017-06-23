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
        mode: "Side By Side View",
        image: "assets/dashboard-item-logo-1.png"
      },
      {
        mode: "Vertical Scroll</br>(Reading View)",
        image: "assets/dashboard-item-logo-2.png"
      },
      {
        mode: "Vertical Scroll</br>(Without Ribbon)",
        image: "assets/dashboard-item-logo-3.png"
      }];
  }
  ngOnInit() {
  }

}
