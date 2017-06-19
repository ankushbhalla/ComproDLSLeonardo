import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LeonardoComponent } from './leonardo.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { QuestionBoxComponent } from './question-box/question-box.component';
import { WorkspaceComponent } from './workspace/workspace.component';

import { SplitPaneModule } from './verticalSplitter/ng2-split-pane';

const leoRoutes: Routes = [
  {
    path: '',
    component: LeonardoComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    SplitPaneModule,
    RouterModule.forChild(leoRoutes)
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
