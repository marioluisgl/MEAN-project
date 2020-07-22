import { Routes, RouterModule } from '@angular/router';

import { GraficsComponent } from './grafics/grafics.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
    { 
        path: '', 
        component: PagesComponent ,
        children: [
            { path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'} }, 
            { path: 'progress', component: ProgressComponent, data: {title: 'Progress'}  },
            { path: 'grafics', component: GraficsComponent, data: {title: 'Graffics'}  },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
      },
];

export const PagesRoutingModule = RouterModule.forChild(routes);