import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, switchMap, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface CampaniaPayload {
  nombre: string;
  descripcion: string;
  fechaLimite: string; 
  metaFondos: number; 
  imagen?: string | null; 
  creadorNombre: string;
  categorias: string[];
}

@Injectable({ providedIn: 'root' })
export class CampaniasService {
  private readonly apiBase = `${environment.apiUrl}/api/campanias`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  private authHeaders(token: string | undefined): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
      'Content-Type': 'application/json'
    });
  }

  crear(payload: CampaniaPayload): Observable<any> {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap(token => {
        const headers = this.authHeaders(token);
        return this.http.post<any>(this.apiBase, payload, { headers });
      }),
      catchError(err => {
        console.error('[crear][error]', err);
        return throwError(() => err);
      })
    );
  }

  listar(): Observable<any[]> {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap(token => {
        const headers = this.authHeaders(token);
        return this.http.get<any[]>(this.apiBase, { headers });
      }),
      catchError(err => {
        console.error('[listar][error]', err);
        return throwError(() => err);
      })
    );
  }

  obtener(id: number): Observable<any> {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap(token => {
        const headers = this.authHeaders(token);
        return this.http.get<any>(`${this.apiBase}/${id}`, { headers });
      }),
      catchError(err => {
        console.error('[obtener][error]', err);
        return throwError(() => err);
      })
    );
  }

  update(id: number, payload: CampaniaPayload): Observable<any> {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap(token => {
        const headers = this.authHeaders(token);
        return this.http.put<any>(`${this.apiBase}/${id}`, payload, { headers });
      }),
      catchError(err => {
        console.error('[update][error]', err);
        return throwError(() => err);
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap(token => {
        const headers = this.authHeaders(token);
        return this.http.delete<void>(`${this.apiBase}/${id}`, { headers });
      }),
      catchError(err => {
        console.error('[delete][error]', err);
        return throwError(() => err);
      })
    );
  }
}
