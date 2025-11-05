import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth-guard';
import { Profile } from './profile/profile';
import { Landing } from './landing/landing';
import { Ping } from './ping/ping';
import { roleGuard } from './auth/role-guard';
import { FailAuth } from './fail-auth/fail-auth';
import { ExplorarCampaniasComponent } from './explorar-campanias/explorar-campanias';

const routes: Routes = [
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: '', component: Landing },
  { path: 'ping', component: Ping },
  { path: 'fail-auth', component: FailAuth },
  {
    path: 'explorar', 
    canActivate: [authGuard],
    data: { roles: ['donante'] },
    component: ExplorarCampaniasComponent 
  },

  {
    path: 'campanias',
    canActivate: [authGuard],
    data: { roles: ['osfl','donante'] },
    loadComponent: () =>
      import('./campanias/listar-campanias').then(m => m.ListarCampanias)
  },
  {
    path: 'campanias/nueva',
    canActivate: [authGuard],
    data: { roles: ['osfl','donante'] },
    loadComponent: () =>
      import('./campanias/crear-campania').then(m => m.CrearCampania)
  },
  {
    path: 'campanias/:id',
    canActivate: [authGuard],
    data: { roles: ['osfl','donante'] },
    loadComponent: () =>
      import('./campanias/detalle-campania').then(m => m.DetalleCampania)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
