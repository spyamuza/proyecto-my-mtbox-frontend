import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Series } from './pages/series/series';
import { Peliculas } from './pages/peliculas/peliculas';
import { UserArea } from './pages/user-area/user-area';
import { MiRegistro } from './pages/mi-registro/mi-registro';
import { Ficha } from './components/ficha/ficha';

import { PublicLayout } from './layouts/public-layout/public-layout';
import { PrivateLayout } from './layouts/private-layout/private-layout';

export const routes: Routes = [

  // ZONA PÚBLICA
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: 'series', component: Series },
      { path: 'peliculas', component: Peliculas },
      { path: 'ficha/:type/:id', component: Ficha },
    ]
  },

  // ZONA PRIVADA
  {
  path: 'app',
  component: PrivateLayout,
  children: [
    {
      path: '',
      redirectTo: 'mi-registro',
      pathMatch: 'full'
    },
    {
      path: 'mi-registro',
      component: MiRegistro
    }
  ]
}
];