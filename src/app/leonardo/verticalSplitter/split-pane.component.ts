import { Component, ViewChild, ElementRef, HostListener, EventEmitter, Input, Output } from '@angular/core';

export abstract class SplitPaneComponent {

  @ViewChild('primaryComponent') public primaryComponent: ElementRef;
  @ViewChild('secondaryComponent') public secondaryComponent: ElementRef;

  @Input('primary-component-initialratio') public initialRatio: number = 0.5;
  @Input('primary-component-minsize') public primaryMinSize: number = 0;
  @Input('secondary-component-minsize') public secondaryMinSize: number = 0;
  @Input('local-storage-key') public localStorageKey: string = null;
  @Output('on-change') public notifySizeDidChange: EventEmitter<any> = new EventEmitter<any>();

  public dividerSize: number = 8.0;
  protected isResizing: boolean = false;

  ngAfterViewInit() {
    let ratio: number = this.initialRatio;
    if (this.localStorageKey != null) {
      let ratioStr = localStorage.getItem(this.localStorageKey);
      if (ratioStr != null) {
        ratio = JSON.parse(ratioStr);
      }
    }
    let size = ratio * this.getTotalSize();
    this.applySizeChange(size);
  }

  protected abstract getTotalSize(): number;
  protected abstract getPrimarySize(): number;
  protected abstract getSecondarySize(): number;
  protected abstract dividerPosition(size: number);

  protected getAvailableSize(): number {
    return this.getTotalSize() - this.dividerSize;
  }

  protected applySizeChange(size: number) {
    if (size != 0) {
      let primarySize = this.checkValidBounds(size, this.primaryMinSize, this.getAvailableSize() - this.secondaryMinSize);
      // console.debug("current: " + this.getPrimarySize()
      //           + " want to be: " + size
      //           + " min: " + this.primaryMinSize
      //           + " max: " + (this.getTotalSize() - this.secondaryMinSize)
      //           + " constrained to: " + primarySize
      //         );
      this.dividerPosition(primarySize);
      this.notifySizeDidChange.emit({'primary' : this.getPrimarySize(), 'secondary' : this.getSecondarySize()});
    }
  }

  public notifyWillChangeSize(resizing: boolean) {
    this.isResizing = resizing;
  }

  public checkValidBounds(newSize: number, minSize: number, maxSize: number): number {
    return newSize >= minSize 
            ? (newSize <= maxSize) 
                ? newSize 
                : maxSize 
            : minSize;
  }

  public stopResizing() {
    this.isResizing = false;
    this.primaryComponent.nativeElement.style.cursor = "auto";
    this.secondaryComponent.nativeElement.style.cursor = "auto";

    if (this.localStorageKey != null) {
      let ratio = this.getPrimarySize() / (this.getTotalSize());
      localStorage.setItem(this.localStorageKey, JSON.stringify(ratio));
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseup(event) {
    this.stopResizing()
    return false;
  }
}
