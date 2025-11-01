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
  guardando = false;
  mensaje = '';

  constructor(private svc: CampaniasService, private router: Router) {}

  onSubmit(e: Event) {
    e.preventDefault();
    if (!this.nombre || !this.fechaLimite) {
      this.mensaje = 'Por favor completa nombre y fecha límite.';
      return;
    }
    this.guardando = true;
    this.mensaje = '';
    this.svc.crear({
      nombre: this.nombre.trim(),
      fechaLimite: this.fechaLimite,
      descripcion: this.descripcion.trim()
    }).subscribe({
      next: () => {
        this.guardando = false;
        this.mensaje = 'Campaña creada con éxito';
        // this.router.navigate(['/']);
      },
      error: (err: unknown) => {
        this.guardando = false;
        this.mensaje = 'Error al crear la campaña';
        console.error(err);
      }
    });
  }
}
