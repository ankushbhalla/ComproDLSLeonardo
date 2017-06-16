import { Component, OnInit, Input, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
declare var Leonardo: any;
@Component({
  selector: 'app-question-box',
  templateUrl: './question-box.component.html',
  styleUrls: ['./question-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuestionBoxComponent implements OnInit {
  @Input() questionData: any;
  @ViewChild('questionHost') questionHost: any;
  constructor() { }

  ngOnInit() {
    this.questionHost.nativeElement.innerHTML = this.questionData["template"];
    let leoInstances = this.questionHost.nativeElement.querySelectorAll(".leoHost");
    for (let index = 0; index < leoInstances.length; index++) {
      let data = this.questionData.leoData[leoInstances[index].getAttribute("leoDataId")];
      // Leonardo.scripts.add(leoInstances[index], data.config, data.correctData );
    }
  }

}