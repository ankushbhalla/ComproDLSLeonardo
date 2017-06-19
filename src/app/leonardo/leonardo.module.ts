import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeonardoComponent } from './leonardo.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { QuestionBoxComponent } from './question-box/question-box.component';
import { WorkspaceComponent } from './workspace/workspace.component';

import { SplitPaneModule } from './verticalSplitter/ng2-split-pane';

@NgModule({
  imports: [
    CommonModule,
    SplitPaneModule
  ],
  exports: [
    LeonardoComponent
  ],
  declarations: [
    LeonardoComponent,
    NavigatorComponent,
    QuestionBoxComponent,
    WorkspaceComponent
  ]
})
export class LeonardoModule { }
