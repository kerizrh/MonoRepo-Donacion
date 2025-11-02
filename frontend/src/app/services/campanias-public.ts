import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CampaniaPublica {
  id: number;
  nombre: string;
  descripcion: string;
  fechaLimite: string;
  metaFondos: number;
  montoRecaudado: number;
  imagen?: string | null;
  creadorNombre: string;
  categorias: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CampaniasPublicService {
  private readonly apiBase = `${environment.apiUrl}/api/public/campanias`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  listarActivas(): Observable<CampaniaPublica[]> {
    return this.auth.getAccessTokenSilently({
      authorizationParams: {
        audience: 'https://donaccion-api',
        scope: 'openid profile email'
      }
    }).pipe(
      switchMap(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<CampaniaPublica[]>(`${this.apiBase}/activas`, { headers });
      })
    );
  }
}
