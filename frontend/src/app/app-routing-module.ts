import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth-guard';
import { Profile } from './profile/profile';
import { Landing } from './landing/landing';
import { Home } from './home/home';
import { Ping } from './ping/ping';
import { roleGuard } from './auth/role-guard'; 
import { FailAuth } from './fail-auth/fail-auth';
import { ExplorarCampaniasComponent } from './explorar-campanias/explorar-campanias';

const routes: Routes = [
  { 
    path: 'profile', 
    component: Profile, 
    canActivate: [authGuard] 
  },
  { path: '', component: Landing },
  
  { 
    path: 'home', 
    component: Home,
    // Agregamos los guards para proteger la ruta
    canActivate: [authGuard, roleGuard], 
    data: { roles: ['donante', 'osfl'] } 
  },
  // ----------------------------------------

  { path: 'ping', component: Ping },
  { path: 'fail-auth', component: FailAuth },
  
  {
    path: 'explorar', 
    canActivate: [authGuard, roleGuard], 
    data: { roles: ['donante'] }, // Solo donantes pueden explorar para donar
    component: ExplorarCampaniasComponent 
  },

  {
    path: 'campanias',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['osfl', 'donante'] },
    loadComponent: () =>
      import('./campanias/listar-campanias').then(m => m.ListarCampanias)
  },
  {
    path: 'campanias/nueva',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['osfl'] }, 
    loadComponent: () =>
      import('./campanias/crear-campania').then(m => m.CrearCampania)
  },
  {
    path: 'campanias/:id',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['osfl', 'donante'] },
    loadComponent: () =>
      import('./campanias/detalle-campania').then(m => m.DetalleCampania)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }