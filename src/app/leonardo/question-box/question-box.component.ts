import { Component, OnInit,OnDestroy, Input, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { LeonardoCoreService } from '../../leonardo-core.service';

@Component({
  selector: 'app-question-box',
  templateUrl: './question-box.component.html',
  styleUrls: ['./question-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuestionBoxComponent implements OnInit, OnDestroy {
  @Input() questionData: any;
  @ViewChild('questionHost') questionHost: any;
  leonardoWidgets;
  constructor( private leonardoCoreService:LeonardoCoreService) { 
    this.leonardoWidgets = {};
  }
  
  ngOnInit() {
    this.questionHost.nativeElement.innerHTML = this.questionData["template"];
    let leoInstances = this.questionHost.nativeElement.querySelectorAll(".leoHost");
    for (let index = 0; index < leoInstances.length; index++) {
      let data = this.questionData.leoData[leoInstances[index].getAttribute("leoDataId")];
      this.leonardoWidgets["questionBox-"+index] = this.leonardoCoreService.addWidget("questionBox-"+index, leoInstances[index], data);
    }
  }

  ngOnDestroy(){
    for (let index = 0; index <Object.keys(this.leonardoWidgets).length; index++) {
      this.leonardoWidgets["questionBox-"+index].destroy();
    }
  }

}