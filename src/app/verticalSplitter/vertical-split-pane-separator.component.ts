import { Component } from '@angular/core';
import { SplitSeparatorComponent } from './split-pane-separator.component'

@Component({
  selector: 'vertical-split-separator',
  styles: [`
    :host {
      width: 21px;
      cursor: ew-resize;
      position: relative;
      background-color: #ececec;
      border-left: 1px solid lightgrey;
      border-right: 1px solid lightgrey;
      z-index:2;
    }

    .handle {
      width: 100%;
      height: 100%;
      padding-left: 3px;
      background-color: rgba(0,0,0,0);
      position: absolute;
    }
  `],
  template: `
    <div class="handle"><span class="glyphicon glyphicon-align-justify" style="color: black; transform: rotate(90deg);"></span></div>
  `
})
export class VerticalSplitSeparatorComponent extends SplitSeparatorComponent {
}
