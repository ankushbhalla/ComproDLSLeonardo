import { Component, OnInit, Input, Output, ViewChild, ElementRef, ViewEncapsulation, EventEmitter } from '@angular/core';
import { LeonardoCoreService } from '../../leonardo-core.service';


@Component({
  selector: 'cosmatt-item-box',
  templateUrl: './cosmatt-item-box.component.html',
  styleUrls: ['./cosmatt-item-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CosmattItemBoxComponent implements OnInit {
  @Input() questionData: any;
  @Input() solutionData: any;
  @ViewChild('cosmattItemContainer') cosmattItemContainer: any;
  @ViewChild('qInstruction') qInstruction: any;
  @ViewChild('workspace') workspace: any;

  isCMWEnabled: boolean = true;
  chapName: string = "";
  secName: string = "";

  constructor(private leonardoCoreService: LeonardoCoreService) { }

  ngOnInit() {
    this.chapName = this.questionData["chapter"];
    this.secName = this.questionData["section"];

    this.cosmattItemContainer.nativeElement.innerHTML = this.questionData["template"];
    let leoInstances = this.cosmattItemContainer.nativeElement.querySelectorAll(".leoHost");
    for (let index = 0; index < leoInstances.length; index++) {
      let data = this.questionData.leoData[leoInstances[index].getAttribute("leoDataId")];
      this.leonardoCoreService.addWidget("spreadsheet-"+index,leoInstances[index], data.config);
    }

    this.renderWorkspace();
  }


  renderWorkspace() {

    this.qInstruction.nativeElement.innerHTML = this.solutionData.qIns;

    if(this.solutionData.gridUIParams){
      if(this.solutionData.gridUIParams.height){
        this.workspace.nativeElement.style.height = this.solutionData.gridUIParams.height + "px";
      }

      if(this.solutionData.gridUIParams.width){
        this.workspace.nativeElement.style.width = this.solutionData.gridUIParams.width + "px";
      }
    }

    this.leonardoCoreService.addWidget("question-1", this.workspace.nativeElement, JSON.parse(JSON.stringify(this.solutionData.config)));
  }

  cmwHandler(){
    this.isCMWEnabled = false;
    let score = this.leonardoCoreService.getWidget("question-1").score();
    this.leonardoCoreService.getWidget("question-1").displayFeedback(score);
  }

  resetHandler(){
    this.isCMWEnabled = true;
    this.leonardoCoreService.getWidget("question-1").clearFeedback();;
  }

}
