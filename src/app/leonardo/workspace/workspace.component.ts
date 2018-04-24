import { Component, OnInit,OnDestroy, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { LeonardoCoreService } from '../../leonardo-core.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit, OnDestroy {
  @Input() solutionData: any;
  @ViewChild('leoHost') leoHost: ElementRef;
  @Output() gridEvent: EventEmitter<Object> = new EventEmitter();
  question;
  constructor(private leonardoCoreService: LeonardoCoreService) { }

  ngOnInit() {
    if(this.solutionData.gridUIParams){
      if(this.solutionData.gridUIParams.height){
        this.leoHost.nativeElement.style.height = this.solutionData.gridUIParams.height + "px";
      }

      if(this.solutionData.gridUIParams.width){
        this.leoHost.nativeElement.style.width = this.solutionData.gridUIParams.width + "px";
      }
    }
    this.question = this.leonardoCoreService.addWidget("workspace-1",this.leoHost.nativeElement, this.solutionData.config);
  }

  ngOnDestroy(){
    this.question.destroy();
  }

  checkAnswer(){
    let score = this.question.score();
    this.question.displayFeedback(score);
  }

  tryAgain(){
    this.question.clearFeedback();
  }

  displayHint(){
    let hint = this.question.displayHint(this.leoHost.nativeElement);
    if(hint.isLastHint) {
      this.gridEvent.emit({type: "hint", hint: hint});
    }
  }
}
