import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardItemComponent } from './dashboard-item/dashboard-item.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [DashboardComponent],
  declarations: [DashboardComponent, DashboardItemComponent]
})
export class DashboardModule { }
