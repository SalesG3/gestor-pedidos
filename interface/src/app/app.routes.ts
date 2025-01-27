import { Routes } from '@angular/router';
import { AuthAdminComponent } from './admin/auth-admin/auth-admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

export const routes: Routes = [
    {path: "admin", children: [
        {path: "login", component: AuthAdminComponent},
        {path: "dashboard", component: DashboardComponent}
    ]}
];
