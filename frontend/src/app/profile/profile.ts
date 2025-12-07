import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    // Nos suscribimos al usuario para inspeccionar sus datos en la consola
    this.auth.user$.subscribe(user => {
      console.log('=============================================');
      console.log('🕵️‍♂️ DATOS RECIBIDOS DE AUTH0 (Revisa aquí tus roles):');
      console.log(user); 
      console.log('=============================================');
    });
  }
}
