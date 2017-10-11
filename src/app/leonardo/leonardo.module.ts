import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { ModalModule } from 'ngx-bootstrap';

import { LeonardoComponent } from './leonardo.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { QuestionBoxComponent } from './question-box/question-box.component';
import { CosmattItemBoxComponent } from './cosmatt-item-box/cosmatt-item-box.component';
import { WorkspaceComponent } from './workspace/workspace.component';

import { SplitPaneModule } from './verticalSplitter/ng2-split-pane';
import { StudymaterialComponent } from './studymaterial/studymaterial.component';

export const leoRoutes: Routes = [
  {
    path: ':id/:mode/:user',
    component: LeonardoComponent
  },
  {
    path: ':id/:mode',
    component: LeonardoComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    SplitPaneModule,
    RouterModule,
    ModalModule.forRoot()
  ],
  exports: [
    LeonardoComponent
  ],
  declarations: [
    LeonardoComponent,
    NavigatorComponent,
    QuestionBoxComponent,
    CosmattItemBoxComponent,
    WorkspaceComponent,
    PdfViewerComponent,
    StudymaterialComponent
  ]
})
export class LeonardoModule { }
