import { Routes } from '@angular/router';
import { LayoutComponent } from './view/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth/login',  
        pathMatch: 'full'  
    },  
    {
        path: '',
        component: LayoutComponent,
        children: [ 
            // { path: 'documentation', component: Documentation },
            { path: 'views', loadChildren: () => import('./view/layout/views.routes') }
        ]
    }, 
    // { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./auth/auth.routes') },
    { path: '**', redirectTo: '/auth/not-found' }
];
