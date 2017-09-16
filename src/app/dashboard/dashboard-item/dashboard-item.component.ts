import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss']
})
export class DashboardItemComponent implements OnInit {
  @Input() questionIndex: Number;
  @Input() quesMeta;
  @ViewChild('title') titleBox: ElementRef;
  constructor() { }

  ngOnInit() {
  }
  createClassName(badgeName){
    return badgeName.split(" ").join("");

  }

}
