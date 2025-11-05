import { Routes } from '@angular/router';   
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ConfigurationComponent } from '../configuration/configuration.component';

export default [
  { path: 'dashboard', component: DashboardComponent} ,
  { path: 'configuration', component: ConfigurationComponent} ,
] as Routes;