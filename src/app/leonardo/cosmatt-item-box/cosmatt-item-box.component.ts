import { Component, OnInit, OnDestroy, Input, Output, ViewChild, ElementRef, ViewEncapsulation, EventEmitter } from '@angular/core';
import { LeonardoCoreService } from '../../leonardo-core.service';
import Viewer from "viewerjs";


@Component({
  selector: 'cosmatt-item-box',
  templateUrl: './cosmatt-item-box.component.html',
  styleUrls: ['./cosmatt-item-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CosmattItemBoxComponent implements OnInit, OnDestroy {
  @Input() questionData: any;
  @Input() solutionData: any;
  @ViewChild('cosmattItemContainer') cosmattItemContainer: any;
  @ViewChild('qInstruction') qInstruction: any;
  @ViewChild('workspace') workspace: any;

  isCMWEnabled: boolean = true;
  chapName: string = "";
  secName: string = "";
  leonardoWidgets;
  constructor(private leonardoCoreService: LeonardoCoreService) { 
    this.leonardoWidgets = {};
  }

  ngOnInit() {
    this.chapName = this.questionData["chapter"];
    this.secName = this.questionData["section"];
    
    this.cosmattItemContainer.nativeElement.innerHTML = this.questionData["template"];
    
    let imageElements = this.cosmattItemContainer.nativeElement.querySelectorAll('.refImage');
    
    if(imageElements){
      let viewerConfig = {
        navbar:false,
        title:false,
        movable:false,
        toolbar:false,
      };

      for (let index = 0; index < imageElements.length; index++) {
      let viewer = new Viewer(imageElements[index],viewerConfig);
      }
    }   

    let leoInstances = this.cosmattItemContainer.nativeElement.querySelectorAll(".leoHost");
    if(leoInstances){
      for (let index = 0; index < leoInstances.length; index++) {
        let data = this.questionData.leoData[leoInstances[index].getAttribute("leoDataId")];
        this.leonardoWidgets["spreadsheet-" + index] = this.leonardoCoreService.addWidget("spreadsheet-" + index, leoInstances[index], data.config);
      }
    }
    let buttons = this.cosmattItemContainer.nativeElement.querySelector(".btnContainer");
    if(buttons){
      buttons.querySelector(".btnCMW").addEventListener("click", this.handleFormSubmit.bind(this));
    }
    if (this.solutionData != null && this.solutionData.config != null) {
      this.renderWorkspace();
    }
  }

  ngOnDestroy(){
    for (let index = 0; index < Object.keys(this.leonardoWidgets).length; index++) {
      this.leonardoWidgets["spreadsheet-" + index].destroy();
    }
    if(this.leonardoCoreService.getWidget("question-1")){
      this.leonardoCoreService.getWidget("question-1").destroy();
    }    
  }


  renderWorkspace() {

    this.qInstruction.nativeElement.innerHTML = this.solutionData.qIns;

    if (this.solutionData.gridUIParams) {
      if (this.solutionData.gridUIParams.height) {
        this.workspace.nativeElement.style.height = this.solutionData.gridUIParams.height + "px";
      }

      if (this.solutionData.gridUIParams.width) {
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

  handleFormSubmit(){
    let score = this.leonardoCoreService.getWidget("spreadsheet-0").score();
    this.leonardoCoreService.getWidget("spreadsheet-0").displayFeedback(score);
  }

  handleFormReset(){
    this.leonardoCoreService.getWidget("spreadsheet-0").clearFeedback();;
  }

}
