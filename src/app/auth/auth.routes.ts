import { Routes } from '@angular/router';  
import { LoginComponent } from './view/login/login.component';
import { NotFoundComponent } from './view/not-found/not-found.component';

export default [
    { path: 'not-found', component: NotFoundComponent }, 
    { path: 'login', component: LoginComponent}
] as Routes;
