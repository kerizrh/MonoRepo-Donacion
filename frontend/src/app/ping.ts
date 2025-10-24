import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class PingService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getPing(): Observable<string> {
    return this.auth.getAccessTokenSilently({
      authorizationParams: {
        audience: 'https://donaccion-api',
        scope: 'openid profile email'
      }
    }).pipe(
      switchMap(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(`${environment.apiUrl}/api/ping`, { headers, responseType: 'text' });
      })
    );
  }
}

