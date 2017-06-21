import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

declare var Leonardo: any;

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  @Input() solutionData: any;
  @ViewChild('leoHost') leoHost: ElementRef;
  constructor() { }

  ngOnInit() {
    if(this.solutionData.gridUIParams){
      if(this.solutionData.gridUIParams.height){
        this.leoHost.nativeElement.style.height = this.solutionData.gridUIParams.height + "px";
      }

      if(this.solutionData.gridUIParams.width){
        this.leoHost.nativeElement.style.width = this.solutionData.gridUIParams.width + "px";
      }
    }

    Leonardo.scripts.add(this.leoHost.nativeElement, this.solutionData.config, this.solutionData.correctData);
  }

  checkAnswer(){
    Leonardo.scripts.checkAnswer(this.leoHost.nativeElement);
  }

  displayHint(){
    Leonardo.scripts.displayHint(this.leoHost.nativeElement);
  }
}
