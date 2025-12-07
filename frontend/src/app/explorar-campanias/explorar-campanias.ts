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

  // Filtros Generales
  texto = '';
  
  // Filtro Organización (Autocomplete logic)
  creadorTexto = ''; // Lo que escribe el usuario
  creadoresDisponibles: string[] = []; // Lista completa única
  sugerenciasCreadores: string[] = []; // Lista filtrada para el dropdown
  mostrarSugerencias = false;

  // Filtro Categorías
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
        // Obtener lista única de creadores
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
      // 1. Filtro por búsqueda general (nombre o desc)
      .filter(c => !this.texto || 
        c.nombre.toLowerCase().includes(this.texto.toLowerCase()) || 
        c.descripcion.toLowerCase().includes(this.texto.toLowerCase())
      )
      // 2. Filtro por Creador (Texto exacto o parcial según decidas, aquí es parcial)
      .filter(c => !this.creadorTexto || 
        c.creadorNombre.toLowerCase().includes(this.creadorTexto.toLowerCase())
      )
      // 3. Filtro por Categorías
      .filter(c => this.categoriasSeleccionadas.length === 0 || 
        c.categorias.some(cat => this.categoriasSeleccionadas.includes(cat))
      );
      
    this.currentPage = 1;
  }

  // === Lógica del Autocomplete de Organización ===
  
  onInputCreador() {
    if (!this.creadorTexto) {
      this.sugerenciasCreadores = [];
      this.mostrarSugerencias = false;
    } else {
      const term = this.creadorTexto.toLowerCase();
      this.sugerenciasCreadores = this.creadoresDisponibles.filter(c => 
        c.toLowerCase().includes(term)
      );
      this.mostrarSugerencias = this.sugerenciasCreadores.length > 0;
    }
    this.aplicarFiltros(); // Filtrar tabla mientras escribe
  }

  seleccionarSugerencia(nombre: string) {
    this.creadorTexto = nombre;
    this.mostrarSugerencias = false;
    this.aplicarFiltros();
  }

  // Pequeño delay al perder foco para permitir el click en la lista
  onBlurCreador() {
    setTimeout(() => {
      this.mostrarSugerencias = false;
    }, 200);
  }

  onFocusCreador() {
    if (this.creadorTexto) {
      this.onInputCreador(); // Volver a mostrar si ya hay texto
    } else {
       // Opcional: Mostrar todos si está vacío al hacer click
       // this.sugerenciasCreadores = this.creadoresDisponibles;
       // this.mostrarSugerencias = true;
    }
  }

  // === Resto de lógica ===

  limpiarFiltros() {
    this.texto = '';
    this.creadorTexto = ''; // Limpiar input creador
    this.sugerenciasCreadores = [];
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