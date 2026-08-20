import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { AdminPanelComponent } from './features/admin/admin-panel.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: 'admin-panel.component',
        component: AdminPanelComponent
    }
];
