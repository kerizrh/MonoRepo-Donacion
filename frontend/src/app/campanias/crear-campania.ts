import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CampaniasService } from '../campanias.service';
import { AuthService } from '@auth0/auth0-angular';

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

  creadorNombre = '';
  categorias: string[] = [];
  nuevaCategoria = '';
  

  constructor(private svc: CampaniasService, private router: Router, private auth: AuthService) {
    this.auth.idTokenClaims$.subscribe(claims => {
      this.creadorNombre = claims?.['name'] || claims?.['email'] || 'Desconocido';
    });
  }

  agregarCategoria() {
    if (this.nuevaCategoria.trim()) {
      this.categorias.push(this.nuevaCategoria.trim());
      this.nuevaCategoria = '';
    }
  }

  eliminarCategoria(cat: string) {
    this.categorias = this.categorias.filter(c => c !== cat);
  }

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
      imagen: this.imagenBase64,
      creadorNombre: this.creadorNombre,
      categorias: this.categorias
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
