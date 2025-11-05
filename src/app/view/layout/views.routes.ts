import { Routes } from '@angular/router';   
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ConfigurationComponent } from '../configuration/configuration.component';
import { ProfileComponent } from '../profile/profile.component';

export default [
  { path: 'dashboard', component: DashboardComponent} ,
  { path: 'configuration', component: ConfigurationComponent} ,
  { path: 'profile', component: ProfileComponent} ,
] as Routes;