import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { FormsModule } from '@angular/forms';
import { CrearCampania } from './campanias/crear-campania';
import { AuthModule } from '@auth0/auth0-angular';
import { Profile } from './profile/profile';
import { Landing } from './landing/landing';
import { Home } from './home/home';
import { Ping } from './ping/ping';
import { PingService } from './ping';

import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { FailAuth } from './fail-auth/fail-auth';
import { ErrorInterceptor } from './auth/error-interceptor';
import { ExplorarCampaniasComponent } from './explorar-campanias/explorar-campanias';

import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    App,
    Profile,
    Landing,
    Home,
    Ping,
    FailAuth,
    ExplorarCampaniasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgSelectModule,
    AuthModule.forRoot({
      domain: 'dev-mqyt53ryrq3bewpb.us.auth0.com',
      clientId: 'H0ZSiFN6HqTFuxf7pwMjMDEFEIViO2h5',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://donaccion-api'
      },
    })
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    PingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [App]
})
export class AppModule { }
