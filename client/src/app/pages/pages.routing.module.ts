import { Routes, RouterModule } from '@angular/router';

import { GraficsComponent } from './grafics/grafics.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AuthGuardGuard, AdminGuardGuard } from '../services/handle.services.service';

const routes: Routes = [
    { 
        path: '', component: PagesComponent, canActivate: [AuthGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'} }, 
            { path: 'progress', component: ProgressComponent, data: {title: 'Progress'}, canActivate: [AdminGuardGuard]},
            { path: 'grafics', component: GraficsComponent, data: {title: 'Graffics'}  },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
      },
];

export const PagesRoutingModule = RouterModule.forChild(routes);