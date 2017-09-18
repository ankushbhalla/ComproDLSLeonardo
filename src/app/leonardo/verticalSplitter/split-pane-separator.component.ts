import { Component, OnInit, HostListener, EventEmitter, Output } from '@angular/core';

export class SplitSeparatorComponent implements OnInit {

  @Output() public notifyWillChangeSize: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event) {
    this.notifyWillChangeSize.emit(true);
    return false;
  }
}
