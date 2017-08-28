import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { LeonardoModule, leoRoutes } from './leonardo/leonardo.module';
import { DashboardModule, dashboardRoutes } from './dashboard/dashboard.module';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/question/v1',
    pathMatch: 'full'
  },
  {
    path: 'question',
    children: leoRoutes
  },
  {
    path: 'dashboard',
    children: dashboardRoutes
  }
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    LeonardoModule,
    DashboardModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
