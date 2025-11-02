import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs/operators';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const requiredRoles: string[] = route.data['roles'] || [];

  return auth.user$.pipe(
    map(user => {
      const userRoles: string[] = user?.['https://donaccion.org/roles'] || [];
      const hasAccess = requiredRoles.some(role => userRoles.includes(role));

      if (!hasAccess) {
        router.navigate(['/fail-auth']);
      }

      return hasAccess;
    })
  );
};

