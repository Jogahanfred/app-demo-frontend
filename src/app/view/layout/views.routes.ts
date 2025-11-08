import { Routes } from '@angular/router';   
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ConfigurationComponent } from '../configuration/configuration.component';
import { ProfileComponent } from '../profile/profile.component';
import { MissionRegisterComponent } from '../mission/mission-register/mission-register.component';
import { MissionGenerateComponent } from '../mission/mission-generate/mission-generate.component'; 
import { SquadronComponent } from '../squadron/squadron.component';
import { UnitComponent } from '../unit/unit.component';
import { PanelHistoryComponent } from '../panel-history/panel-history.component';
import { GroupHistoryComponent } from '../group-history/group-history.component';

export default [
  { path: 'dashboard', component: DashboardComponent} ,
  { path: 'configuration', component: ConfigurationComponent} ,
  { path: 'profile', component: ProfileComponent} ,
  { path: 'mission-register', component: MissionRegisterComponent} ,
  { path: 'mission-generate', component: MissionGenerateComponent} ,
  { path: 'squadron', component: SquadronComponent} ,
  { path: 'unit', component: UnitComponent} ,
  { path: 'panel-history', component: PanelHistoryComponent} ,
  { path: 'group-history', component: GroupHistoryComponent} ,
] as Routes;