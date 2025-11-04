import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CampaniasService } from '../campanias.service';
import { AuthService } from '@auth0/auth0-angular';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-campania',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear-campania.html',
  styleUrls: ['./crear-campania.css']
})
export class CrearCampania implements OnInit {
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
  minDate = '';

  constructor(private svc: CampaniasService, private router: Router, private auth: AuthService) {
    this.auth.idTokenClaims$.subscribe(claims => {
      this.creadorNombre = claims?.['name'] || claims?.['email'] || 'Desconocido';
    });
  }

  ngOnInit(): void {
    const hoyMas2 = new Date();
    hoyMas2.setDate(hoyMas2.getDate() + 2);
    this.minDate = this.toLocalDateInput(hoyMas2);
  }

  private toLocalDateInput(d: Date): string {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  private fechaEsValida(fechaISO: string): boolean {
    if (!fechaISO) return false;
    const valor = new Date(fechaISO + 'T00:00:00');
    const min = new Date();
    min.setHours(0, 0, 0, 0);
    min.setDate(min.getDate() + 2);
    return valor.getTime() >= min.getTime();
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

    if (!this.nombre || !this.fechaLimite || this.categorias.length ===0) {
      this.mensaje = 'Por favor complete todos los campos obligatorios marcados.';
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Debes completar los campos obligatorios antes de continuar.',
        toast: true,
        timer: 2000,
        position: 'top-end',
        showConfirmButton: false
       });
      return;
    }

    if (!this.fechaEsValida(this.fechaLimite)) {
      this.mensaje = 'La fecha debe ser al menos 2 días después de hoy.';
      return;
    }

    if (this.metaFondos < 1) {
      this.mensaje = 'La meta a recaudar debe ser al menos $1.00 USD.';
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
  Swal.fire({
    icon: 'success',
    title: 'Campaña creada con éxito',
    showConfirmButton: false,
    timer: 1500,
    toast: true,
    position: 'top-end'
  });
  setTimeout(() => {
          this.router.navigate(['/campanias']);
        }, 1500);
      },
      error: (err: unknown) => {
        this.guardando = false;
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error al crear la campaña',
          text: 'Hubo un problema, intenta de nuevo.',
          timer: 2000,
          toast: true,
          position: 'top-end'
        });
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
