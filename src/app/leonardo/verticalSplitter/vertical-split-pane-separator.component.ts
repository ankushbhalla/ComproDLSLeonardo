import { Component } from '@angular/core';
import { SplitSeparatorComponent } from './split-pane-separator.component'

@Component({
  selector: 'vertical-split-separator',
  styles: [`
    :host {
      width: 21px;
      cursor: url(../assets/cursor.cur), ew-resize;
      position: relative;
      background-color: #f7f7f7;
      border-left: 1px solid lightgrey;
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
    <div class="handle"><img src="../assets/splitter.png"></div>
  `
})
export class VerticalSplitSeparatorComponent extends SplitSeparatorComponent {
}
