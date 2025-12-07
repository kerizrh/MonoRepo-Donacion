import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map, filter, take, tap } from 'rxjs/operators'; 

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  
  const ROLES_KEY = 'https://donaccion.org/roles';

  return auth.user$.pipe(

    filter(user => !!user),

    take(1),
    
    map(user => {
      const rawRoles = (user![ROLES_KEY] || user!['roles'] || []) as string[];
      const expectedRoles = (route.data['roles'] as string[]) || [];

      const userRolesLower = rawRoles.map(r => r.toLowerCase());
      const expectedRolesLower = expectedRoles.map(r => r.toLowerCase());

      const hasRole = userRolesLower.some(role => expectedRolesLower.includes(role));

      if (hasRole) {
        return true;
      } else {
        console.warn('⛔ [RoleGuard] Bloqueando acceso. Redirigiendo...');
        return router.createUrlTree(['/fail-auth']); 
      }
    })
  );
};