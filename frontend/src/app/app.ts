import { Component, signal } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CampaniasService } from './campanias.service';


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
  isDonante = false;

  puntos: number | null = null;

  constructor(public auth: AuthService, private CampaniasService: CampaniasService) {
    this.auth.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
      if (isAuth) {
        this.puntos = null;
      }
    });

    this.CampaniasService.puntosActualizados$.subscribe(puntos => {
      if (puntos !== null) {
        this.puntos = puntos; // actualizar header en tiempo real
      }
    });


    this.auth.idTokenClaims$.subscribe(claims => {
      const roles = claims?.['https://donaccion.org/roles'] || [];
      this.isOsfl = roles.includes('osfl');
      this.isAdmin = roles.includes('administrador');
      this.isDonante = roles.includes('donante');

      if (this.isDonante) {
        this.cargarPuntos();
      }
    });
  }
  
  private cargarPuntos(): void {
    this.CampaniasService.obtenerMisPuntos().subscribe({
      next: (p: number) => this.puntos = p,
      error: (err: any) => {
        console.error('Error al cargar puntos', err);
        this.puntos = 0;
      }
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
