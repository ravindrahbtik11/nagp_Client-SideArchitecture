import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'mfe1',
        loadComponent: () =>
            loadRemoteModule('mfe1', './Component').then((m) => m.AppComponent),
    },
    {
        path: 'mfe2',
        loadComponent: () =>
            loadRemoteModule('mfe2', './Component').then((m) => m.AppComponent),
    },
    {
        path: '**',
        component: HomeComponent,
    },
];
