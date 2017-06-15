import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerticalSplitSeparatorComponent } from './vertical-split-pane-separator.component';
import { VerticalSplitPaneComponent } from './vertical-split-pane.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    VerticalSplitPaneComponent,
    VerticalSplitSeparatorComponent
  ],
  exports: [VerticalSplitPaneComponent]
})
export class SplitPaneModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SplitPaneModule,
      providers: []
    }
  }
}