import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss']
})
export class DashboardItemComponent implements OnInit {
  @Input() questionIndex: Number;
  @Input() mode: String;
  @ViewChild('title') titleBox: ElementRef;
  constructor() { }

  ngOnInit() {
    this.titleBox.nativeElement.innerHTML = this.mode;
  }

}
