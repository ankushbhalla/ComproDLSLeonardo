import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss']
})
export class DashboardItemComponent implements OnInit {
  @Input() questionIndex: Number;
  @Input() mode: String;
  constructor() { }

  ngOnInit() {
  }

}
