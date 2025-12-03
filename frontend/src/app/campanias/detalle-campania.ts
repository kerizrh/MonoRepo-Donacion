import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CampaniasService } from '../campanias.service';
import Swal from 'sweetalert2'; // <--- Importación de SweetAlert2

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

  // === LÓGICA DE DONACIÓN Y CADENA DE MODALES ===

  private showConfirmationAndAPICall(monto: number) {
    // MODAL C: Advertencia y Confirmación Final (API Call)
    Swal.fire({
        title: '¿Estás seguro?',
        text: `Estás a punto de donar $${monto}.00 USD a esta campaña. Confirma la donación.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#16a34a',
        cancelButtonColor: '#d33',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            // Ejecución del Servicio (Lógica del Backend)
            return new Promise((resolve, reject) => {
                this.svc.donar(this.id, monto).subscribe({
                    next: (res) => resolve(res),
                    error: (err) => {
                        console.error(err);
                        reject('Error: No se pudo procesar la donación. (Verifica el Backend)');
                    }
                });
            });
        }
    }).then((finalResult) => {
        if (finalResult.isConfirmed) {
            // ÉXITO: MISMA NOTIFICACIÓN DE CONFIRMACIÓN
            Swal.fire({
                title: '¡Donación Exitosa!',
                text: `Tu aporte de $${monto}.00 USD ha sido registrado y has ganado puntos.`,
                icon: 'success',
                confirmButtonColor: '#16a34a'
            });
            this.cargar(); // Recargar datos para actualizar el progreso
        }
    });
  }

  private showManualInputModal() {
    // MODAL B: Entrada Manual de Cantidad (Con colores y texto corregidos)
    Swal.fire({
        title: 'Ingresa otra cantidad',
        text: 'Monto mínimo $1.00 USD',
        input: 'number',
        inputAttributes: {
            min: '1',
            step: '1',
            placeholder: 'Ej. 10.00'
        },
        customClass: { 
            input: 'swal-input-monto'
        },
        showCancelButton: true,
        confirmButtonText: 'Donar esta cantidad',
        cancelButtonText: 'Cancelar', 
        confirmButtonColor: '#16a34a', 
        cancelButtonColor: '#d33',      
        
        preConfirm: (monto) => {
            const manualAmount = Number(monto);
            if (!manualAmount || manualAmount < 1) {
                Swal.showValidationMessage('El monto mínimo es $1.00');
                return false;
            }
            return manualAmount;
        }
    }).then((amountResult) => {
        if (amountResult.isConfirmed) {
            // Pasa al modal de Advertencia (Modal C)
            this.showConfirmationAndAPICall(amountResult.value);
        }
    });
  }

  donar() {
    // MODAL A: Selección Rápida (El primer modal que verá el usuario)
    Swal.fire({
        title: 'Selecciona el monto',
        html: `
            <div id="amount-options" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin: 15px 0 25px 0;">
                <button class="amount-btn btn btn-sm btn-primary" data-amount="5" style="background-color: #0d6efd; color: white; border: none; padding: 10px 15px; border-radius: 5px;">$5</button>
                <button class="amount-btn btn btn-sm btn-primary" data-amount="10" style="background-color: #0d6efd; color: white; border: none; padding: 10px 15px; border-radius: 5px;">$10</button>
                <button class="amount-btn btn btn-sm btn-primary" data-amount="25" style="background-color: #0d6efd; color: white; border: none; padding: 10px 15px; border-radius: 5px;">$25</button>
                <button class="amount-btn btn btn-sm btn-primary" data-amount="50" style="background-color: #0d6efd; color: white; border: none; padding: 10px 15px; border-radius: 5px;">$50</button>
            </div>
            
            <div style="display: flex; justify-content: center; gap: 10px; margin-top: 20px;">
                <button id="other-amount-btn" style="background-color: #16a34a; color: white; border: none; padding: 10px 15px; border-radius: 5px; width: 160px; font-weight: 500;">Otra cantidad</button>
                <button id="cancel-custom-btn" style="background-color: #d33; color: white; border: none; padding: 10px 15px; border-radius: 5px; width: 160px; font-weight: 500;">Cancelar</button>
            </div>
        `,
        focusConfirm: false,
        showCancelButton: false, 
        showConfirmButton: false, 
        didOpen: () => {
            // 1. Listeners para los botones de monto rápido
            const buttons = document.querySelectorAll('.amount-btn');
            buttons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const target = e.target as HTMLElement;
                    const monto = Number(target.dataset['amount']);
                    
                    Swal.close(); 
                    this.showConfirmationAndAPICall(monto); // Va directo a la confirmación
                });
            });

            // 2. Listener para el botón 'Otra cantidad'
            document.getElementById('other-amount-btn')?.addEventListener('click', () => {
                Swal.close(); 
                this.showManualInputModal(); // Cierra A y abre el modal B
            });
            
            // 3. Listener para el botón 'Cancelar'
            document.getElementById('cancel-custom-btn')?.addEventListener('click', () => {
                Swal.close(); // Cierra el modal 
            });
        }
    });
  }
}