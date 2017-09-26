import { Component, OnInit, Input, Output, ViewChild, ElementRef, ViewEncapsulation, EventEmitter } from '@angular/core';
declare var Leonardo: any;
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

  constructor() { }

  ngOnInit() {
    this.chapName = this.questionData["chapter"];
    this.secName = this.questionData["section"];

    this.cosmattItemContainer.nativeElement.innerHTML = this.questionData["template"];
    let leoInstances = this.cosmattItemContainer.nativeElement.querySelectorAll(".leoHost");
    for (let index = 0; index < leoInstances.length; index++) {
      let data = this.questionData.leoData[leoInstances[index].getAttribute("leoDataId")];
      Leonardo.scripts.add(leoInstances[index], data.config, data.correctData );
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

    Leonardo.scripts.add(this.workspace.nativeElement, JSON.parse(JSON.stringify(this.solutionData.config)), this.solutionData.correctData);
  }

  cmwHandler(){
    this.isCMWEnabled = false;
    Leonardo.scripts.checkAnswer(this.workspace.nativeElement);
  }

  resetHandler(){
    this.isCMWEnabled = true;
    Leonardo.scripts.reset(this.workspace.nativeElement);
  }

}
