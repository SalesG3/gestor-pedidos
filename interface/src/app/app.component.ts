import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthAdminComponent } from './admin/auth-admin/auth-admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthAdminComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'interface';
}
