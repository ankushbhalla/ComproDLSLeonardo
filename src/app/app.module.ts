import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router'

import { LeonardoModule } from "./leonardo/leonardo.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { AppComponent } from './app.component';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'v1',
    pathMatch: 'full'
  },
  {
    path: 'v1',
    loadChildren: './leonardo/leonardo.module#LeonardoModule'
  }
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LeonardoModule,
    DashboardModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
