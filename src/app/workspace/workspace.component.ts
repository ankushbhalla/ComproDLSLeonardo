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
    Leonardo.scripts.add(this.leoHost.nativeElement, this.solutionData.config, this.solutionData.correctData);
  }

  checkAnswer(){
    Leonardo.scripts.checkAnswer(this.leoHost.nativeElement);
  }

  displayHint(){
    Leonardo.scripts.displayHint(this.leoHost.nativeElement);
  }
}
