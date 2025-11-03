import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CampaniasService } from '../campanias.service';

@Component({
  selector: 'app-detalle-campania',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-campania.html',
  styleUrls: ['./detalle-campania.css']
})
export class DetalleCampania implements OnInit {
  id!: number;
  cargando = false;
  error = '';
  data: any = null;

  constructor(private route: ActivatedRoute, private svc: CampaniasService) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.id) { this.error = 'ID inválido'; return; }
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.svc.obtener(this.id).subscribe({
      next: (d: any) => { this.data = d; this.cargando = false; },
      error: () => { this.error = 'No se pudo cargar la campaña'; this.cargando = false; }
    });
  }

  get progreso(): number {
    const meta = Number(this.data?.metaFondos || 0);
    const rec = Number(this.data?.montoRecaudado || 0);
    if (!meta || meta <= 0) return 0;
    return Math.max(0, Math.min(100, Math.round((rec / meta) * 100)));
  }

  get fechaTexto(): string {
    const f = this.data?.fechaLimite;
    if (!f) return 'Sin fecha límite';
    const hoy = new Date();
    const fin = new Date(f + 'T00:00:00');
    const ms = fin.getTime() - new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()).getTime();
    const dias = Math.ceil(ms / (1000 * 60 * 60 * 24));
    if (dias < 0) return 'Finalizada';
    if (dias === 0) return 'Hoy vence';
    if (dias === 1) return '1 día restante';
    return dias + ' días restantes';
  }
}
