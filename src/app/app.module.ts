import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { QuestionBoxComponent } from './question-box/question-box.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { SplitPaneModule } from './verticalSplitter/ng2-split-pane';

@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    QuestionBoxComponent,
    WorkspaceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SplitPaneModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
