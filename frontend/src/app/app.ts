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
    logoutParams: {
      returnTo: window.location.origin
    }
  };
  constructor(public auth: AuthService) {}

  login(): void {
    this.auth.loginWithRedirect({
      authorizationParams: {
        audience: 'https://donaccion-api',
        scope: 'openid profile email',        
      }
    });
  }
}
