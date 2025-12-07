import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CampaniaPublica, CampaniasPublicService } from '../services/campanias-public';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  
  userName: string = 'Usuario';
  recomendadas: CampaniaPublica[] = [];
  
  // Variables de control de Roles
  esDonante = false;
  esOsfl = false;

  // Estados de carga
  cargando = true;

  constructor(
    public auth: AuthService,
    private svc: CampaniasPublicService
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.userName = user.given_name || user.name || user.nickname || 'Usuario';
        
        const ROLES_KEY = 'https://donaccion.org/roles';
        const roles = (user[ROLES_KEY] as string[]) || [];
        const rolesLower = roles.map(r => r.toLowerCase());

        this.esDonante = rolesLower.includes('donante');
        this.esOsfl = rolesLower.includes('osfl');

        if (this.esDonante) {
          this.cargarRecomendaciones();
        } else {
          this.cargando = false;
        }
      }
    });
  }

  cargarRecomendaciones() {
    this.svc.listarActivas().subscribe({
      next: (list) => {
        this.recomendadas = list.slice(0, 3);
        this.cargando = false;
      },
      error: (err) => {
        console.warn('Error cargando campañas', err);
        this.cargando = false;
      }
    });
  }

  calcPorcentaje(c: CampaniaPublica): number {
    if (!c || !c.metaFondos || c.metaFondos <= 0) return 0;
    const pct = Math.round((Number(c.montoRecaudado || 0) / Number(c.metaFondos)) * 100);
    return Math.max(0, Math.min(100, pct));
  }
}