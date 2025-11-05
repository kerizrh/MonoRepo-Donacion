import { Component, OnInit } from '@angular/core';
import { CampaniaPublica, CampaniasPublicService } from '../services/campanias-public';

@Component({
  selector: 'app-explorar-campanias',
  standalone: false,
  templateUrl: './explorar-campanias.html',
  styleUrl: './explorar-campanias.css'
})
export class ExplorarCampaniasComponent implements OnInit {
  cargando = false;
  error = '';
  campanias: CampaniaPublica[] = [];
  campaniasFiltradas: CampaniaPublica[] = [];

  // filtros
  texto = '';
  creadoresDisponibles: string[] = [];
  creadoresSeleccionados: string[] = [];
  categoriasDisponibles: string[] = [];
  categoriasSeleccionadas: string[] = [];

  pageSize = 20;
  currentPage = 1;

  constructor(private svc: CampaniasPublicService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.cargando = true;
    this.svc.listarActivas().subscribe({
      next: (list) => {
        this.campanias = list;
        this.campaniasFiltradas = list;
        this.creadoresDisponibles = [...new Set(list.map(c => c.creadorNombre))];
        this.categoriasDisponibles = [...new Set(list.flatMap(c => c.categorias))];
        this.cargando = false;
        this.currentPage = 1;
      },
      error: () => {
        this.error = 'No se pudieron cargar las campañas.';
        this.cargando = false;
      }
    });
  }

  aplicarFiltros() {
    this.campaniasFiltradas = this.campanias
      .filter(c => !this.texto || c.nombre.toLowerCase().includes(this.texto.toLowerCase()) || c.descripcion.toLowerCase().includes(this.texto.toLowerCase()))
      .filter(c => this.creadoresSeleccionados.length === 0 || this.creadoresSeleccionados.includes(c.creadorNombre))
      .filter(c => this.categoriasSeleccionadas.length === 0 || c.categorias.some(cat => this.categoriasSeleccionadas.includes(cat)));
      this.currentPage = 1;
  }

  toggleCreador(nombre: string) {
    if (this.creadoresSeleccionados.includes(nombre)) {
      this.creadoresSeleccionados = this.creadoresSeleccionados.filter(c => c !== nombre);
    } else {
      this.creadoresSeleccionados.push(nombre);
    }
    this.aplicarFiltros();
  }

  toggleCategoria(cat: string) {
    if (this.categoriasSeleccionadas.includes(cat)) {
      this.categoriasSeleccionadas = this.categoriasSeleccionadas.filter(c => c !== cat);
    } else {
      this.categoriasSeleccionadas.push(cat);
    }
    this.aplicarFiltros();
  }

  limpiarFiltros() {
    this.texto = '';
    this.creadoresSeleccionados = [];
    this.categoriasSeleccionadas = [];
    this.aplicarFiltros();
  }

  get paginadas(): CampaniaPublica[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.campaniasFiltradas.slice(start, start + this.pageSize);
  }

  totalPages(): number {
    return Math.ceil(this.campaniasFiltradas.length / this.pageSize);
  }

  cambiarPagina(p: number) {
    if (p >= 1 && p <= this.totalPages()) {
      this.currentPage = p;
    }
  }

  // === agregado para mostrar meta/recaudado/progreso ===
  fechaRestanteTexto(c: CampaniaPublica): string {
    const hoy = new Date();
    const fin = new Date(c.fechaLimite + 'T00:00:00');
    const ms = fin.getTime() - new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()).getTime();
    const dias = Math.ceil(ms / (1000 * 60 * 60 * 24));
    if (dias < 0) return 'Finalizada';
    if (dias === 0) return 'Hoy vence';
    if (dias === 1) return '1 día restante';
    return `${dias} días restantes`;
  }

  progreso(c: CampaniaPublica): number {
    if (!c || !c.metaFondos || c.metaFondos <= 0) return 0;
    const pct = Math.round((Number(c.montoRecaudado || 0) / Number(c.metaFondos)) * 100);
    return Math.max(0, Math.min(100, pct));
  }
}