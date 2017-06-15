import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

declare var Leonardo: any;

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit, OnChanges {
  @Input() solutionData: any;
  @Input() checkAnswerClicked: boolean;
  @ViewChild('leoHost') leoHost: ElementRef;
  constructor() { }

  ngOnInit() {
    Leonardo.scripts.add(this.leoHost.nativeElement, this.solutionData.config, this.solutionData.correctData);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["checkAnswerClicked"].currentValue === true) {
      Leonardo.scripts.checkAnswer(this.leoHost.nativeElement);
      this.checkAnswerClicked = false;
    }
  }
}
