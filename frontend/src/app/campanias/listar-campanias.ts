import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CampaniasService } from '../campanias.service';

export interface Campania {
  id: number;
  nombre: string;
  descripcion: string;
  fechaLimite: string; // ISO date (YYYY-MM-DD) desde backend
}

@Component({
  selector: 'app-listar-campanias',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listar-campanias.html',
  styleUrls: ['./listar-campanias.css']
})
export class ListarCampanias implements OnInit {
  cargando = false;
  error = '';
  campanias: Campania[] = [];

  constructor(private svc: CampaniasService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.cargando = true;
    this.error = '';
    this.svc.listar().subscribe({
      next: (data) => {
        this.campanias = (data ?? []).sort((a: Campania, b: Campania) => {
          // más próximas primero
          return (a.fechaLimite || '').localeCompare(b.fechaLimite || '');
        });
        this.cargando = false;
      },
      error: (err: unknown) => {
        console.error(err);
        this.error = 'No se pudieron cargar las campañas.';
        this.cargando = false;
      }
    });
  }

  fechaRestanteTexto(c: Campania): string {
    if (!c.fechaLimite) return 'Sin fecha límite';
    const hoy = new Date();
    const fin = new Date(c.fechaLimite + 'T00:00:00');
    const ms = fin.getTime() - new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()).getTime();
    const dias = Math.ceil(ms / (1000 * 60 * 60 * 24));
    if (dias < 0) return 'Finalizada';
    if (dias === 0) return 'Hoy vence';
    if (dias === 1) return '1 día restante';
    return `${dias} días restantes`;
  }
}
