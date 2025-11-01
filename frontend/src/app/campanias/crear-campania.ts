import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CampaniasService } from '../campanias.service';

@Component({
  selector: 'app-crear-campania',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear-campania.html',
  styleUrls: ['./crear-campania.css']
})
export class CrearCampania {
  nombre = '';
  fechaLimite = '';
  descripcion = '';
  metaFondos = 0;
  imagenBase64: string | null = null;
  guardando = false;
  mensaje = '';

  constructor(private svc: CampaniasService, private router: Router) {}

  onSubmit(e: Event) {
    e.preventDefault();
    if (!this.nombre || !this.fechaLimite) {
      this.mensaje = 'Por favor completa nombre y fecha límite.';
      return;
    }
    if (this.metaFondos < 0) {
      this.mensaje = 'La meta a recaudar debe ser 0 o mayor.';
      return;
    }
    this.guardando = true;
    this.svc.crear({
      nombre: this.nombre.trim(),
      fechaLimite: this.fechaLimite,
      descripcion: this.descripcion.trim(),
      metaFondos: Number(this.metaFondos),
      imagen: this.imagenBase64
    }).subscribe({
      next: () => {
        this.guardando = false;
        this.mensaje = 'Campaña creada con éxito';
        
      },
      error: (err: unknown) => {
        this.guardando = false;
        this.mensaje = 'Error al crear la campaña';
        console.error(err);
      }
    });
  }

  onFile(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (!file) { this.imagenBase64 = null; return; }
    const reader = new FileReader();
    reader.onload = () => {
      const result = (reader.result as string) || '';
      const base64 = result.includes(',') ? result.split(',')[1] : result;
      this.imagenBase64 = base64;
    };
    reader.readAsDataURL(file);
  }
}
