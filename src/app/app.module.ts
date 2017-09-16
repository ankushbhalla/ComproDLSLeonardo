import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { LeonardoModule, leoRoutes } from './leonardo/leonardo.module';
import { DashboardModule, dashboardRoutes } from './dashboard/dashboard.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
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
    BrowserModule,
    LeonardoModule,
    DashboardModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers:[DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
