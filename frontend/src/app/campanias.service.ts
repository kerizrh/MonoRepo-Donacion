import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, switchMap, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface CampaniaPayload {
  nombre: string;
  descripcion: string;
  fechaLimite: string; // YYYY-MM-DD
}

@Injectable({ providedIn: 'root' })
export class CampaniasService {
  private readonly apiBase = `${environment.apiUrl}/api/campanias`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  private authHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  crear(payload: CampaniaPayload): Observable<any> {
    // Depuración: ver qué enviamos
    console.log('[crear][payload]', payload);

    return this.auth.getAccessTokenSilently({
      authorizationParams: {
        audience: 'https://donaccion-api',
        scope: 'openid profile email'
      }
    }).pipe(
      tap(tk => console.log('[crear][token-prefix]', tk?.slice(0, 15))),
      switchMap(token => {
        const headers = this.authHeaders(token);
        return this.http.post(this.apiBase, payload, { headers });
      }),
      tap(resp => console.log('[crear][resp]', resp)),
      catchError(err => {
        console.error('[crear][error]', err);
        return throwError(() => err);
      })
    );
  }

  listar(): Observable<any[]> {
    return this.auth.getAccessTokenSilently({
      authorizationParams: {
        audience: 'https://donaccion-api',
        scope: 'openid profile email'
      }
    }).pipe(
      tap(tk => console.log('[listar][token-prefix]', tk?.slice(0, 15))),
      switchMap(token => {
        const headers = this.authHeaders(token);
        return this.http.get<any[]>(this.apiBase, { headers });
      }),
      tap(list => console.log('[listar][resp]', list)),
      catchError(err => {
        console.error('[listar][error]', err);
        return throwError(() => err);
      })
    );
  }
}
