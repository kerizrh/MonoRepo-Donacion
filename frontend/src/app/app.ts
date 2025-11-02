import { Component, signal } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  public logoutOptions = {
    logoutParams: { returnTo: window.location.origin }
  };

  isAuthenticated = false;
  isOsfl = false;
  isAdmin = false;

  constructor(public auth: AuthService) {
    this.auth.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });

    this.auth.idTokenClaims$.subscribe(claims => {
      const roles = claims?.['https://donaccion.org/roles'] || [];
      this.isOsfl = roles.includes('osfl');
      this.isAdmin = roles.includes('administrador');
    });
  }

  login(): void {
    this.auth.loginWithRedirect({
      authorizationParams: {
        audience: 'https://donaccion-api',
        scope: 'openid profile email',
      }
    });
  }
}
