import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CampaniasService } from '../campanias.service';

export interface Campania {
  id: number;
  nombre: string;
  descripcion: string;
  fechaLimite: string; // ISO date (YYYY-MM-DD) desde backend
  metaFondos: number;
  montoRecaudado: number;
}

@Component({
  selector: 'app-listar-campanias',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './listar-campanias.html',
  styleUrls: ['./listar-campanias.css']
})
export class ListarCampanias implements OnInit {
  cargando = false;
  error = '';
  campanias: Campania[] = [];

  editId: number | null = null;
  editNombre = '';
  editDescripcion = '';
  editFechaLimite = '';
  editMetaFondos: number | null = null;

  constructor(private svc: CampaniasService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.cargando = true;
    this.error = '';
    this.svc.listar().subscribe({
      next: (list: any[]) => {
        this.campanias = list as Campania[];
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

  progreso(c: Campania): number {
    if (!c || !c.metaFondos || c.metaFondos <= 0) return 0;
    const pct = Math.round((Number(c.montoRecaudado || 0) / Number(c.metaFondos)) * 100);
    return Math.max(0, Math.min(100, pct));
  }

  startEdit(c: Campania) {
    this.editId = c.id;
    this.editNombre = c.nombre;
    this.editDescripcion = c.descripcion;
    this.editFechaLimite = c.fechaLimite;
    this.editMetaFondos = c.metaFondos;
  }

  cancelEdit() {
    this.editId = null;
    this.editNombre = '';
    this.editDescripcion = '';
    this.editFechaLimite = '';
    this.editMetaFondos = null;
  }

  saveEdit(c: Campania) {
    if (!this.editId || !this.editNombre || !this.editFechaLimite || this.editMetaFondos == null) return;
    const payload = {
      nombre: this.editNombre.trim(),
      descripcion: (this.editDescripcion || '').toString().trim(),
      fechaLimite: this.editFechaLimite,
      metaFondos: Number(this.editMetaFondos)
    };
    this.cargando = true;
    this.svc.update(this.editId!, payload).subscribe({
      next: () => {
        this.svc.listar().subscribe({
          next: (list) => {
            this.campanias = list as Campania[];
            this.cargando = false;
            this.cancelEdit();
          },
          error: () => { this.cargando = false; }
        });
      },
      error: () => { this.cargando = false; }
    });
  }

  eliminar(c: Campania) {
    if (!confirm('¿Eliminar esta campaña?')) return;
    this.cargando = true;
    this.svc.delete(c.id).subscribe({
      next: () => {
        this.campanias = this.campanias.filter(x => x.id !== c.id);
        this.cargando = false;
      },
      error: () => { this.cargando = false; }
    });
  }
}
