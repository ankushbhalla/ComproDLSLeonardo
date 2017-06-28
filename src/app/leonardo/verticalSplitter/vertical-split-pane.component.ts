import { Component, OnInit, ViewChild, ElementRef, HostListener, EventEmitter, Input, Output } from '@angular/core';
import { SplitPaneComponent } from './split-pane.component'
import { PositionService } from './position.service'

@Component({
  selector: 'vertical-split-pane',
  styles: [`
    :host{
      height: 100%;
      width: 100%;
    }
    .v-outer {
      height: calc(100% - 1px);
      width: 100%;
      padding-top: 1px;
      display: flex;
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      background-color: #fff;
    }

    .left-component {
      width: calc(50%);
      height:100%;      
    }

    .right-component {
      width: calc(50%);
      overflow: hidden;
      height:100%;
    }
  `],
  template: `
  <div #outer class="v-outer">
    <div #primaryComponent class="left-component">
      <ng-content select=".split-pane-content-primary"></ng-content>
    </div>
    <vertical-split-separator #separator (notifyWillChangeSize)="notifyWillChangeSize($event)"></vertical-split-separator>
    <div #secondaryComponent class="right-component">
      <ng-content select=".split-pane-content-secondary"></ng-content>
    </div>
  </div>
  `,
})
export class VerticalSplitPaneComponent extends SplitPaneComponent {

  @ViewChild('outer') protected outerContainer: ElementRef;

  protected getTotalSize(): number {
    return this.outerContainer.nativeElement.offsetWidth;
  }

  protected getPrimarySize(): number {
    return this.primaryComponent.nativeElement.offsetWidth;
  }

  protected getSecondarySize(): number {
    return this.secondaryComponent.nativeElement.offsetWidth;
  }

  protected dividerPosition(size: number) {
    let ext = 3;
    const sizePct = (size / this.getTotalSize()) * 100;
    this.primaryComponent.nativeElement.style.width = sizePct + "%";
    this.secondaryComponent.nativeElement.style.width = "calc(" + (100 - sizePct) + "% - 21px)";
  }

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
      if (this.isResizing) {
        let coords = PositionService.offset(this.primaryComponent);
        this.applySizeChange(event.pageX - coords.left);
      }
      return false;
    }
}
