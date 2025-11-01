import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map, tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAuthenticated$.pipe(
    tap(loggedIn => {
      if (!loggedIn) {
        router.navigate(['/']);
      }
    }),
    map(loggedIn => loggedIn)
  );
};

