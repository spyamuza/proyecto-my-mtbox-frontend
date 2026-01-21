import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { Series } from './pages/series/series';
import { Peliculas } from './pages/peliculas/peliculas';
import { PublicLayout } from './layouts/public-layout/public-layout';


export const routes: Routes = [
    {
    path: '', component: PublicLayout,
    children: [
        { path: '', redirectTo: '/home', pathMatch: 'full' },
        { path: 'home', component: Home },
        { path: 'login', component: Login },
        { path: 'registro', component: Registro },
        { path: 'series', component: Series },
        { path: 'peliculas', component: Peliculas },
    ],

    },
];
