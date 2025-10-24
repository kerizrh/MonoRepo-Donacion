import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { AuthModule } from '@auth0/auth0-angular';
import { Profile } from './profile/profile';
import { Landing } from './landing/landing';
import { Ping } from './ping/ping';
import { PingService } from './ping';

import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    App,
    Profile,
    Landing,
    Ping
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
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
    }
  ],
  bootstrap: [App]
})
export class AppModule { }
