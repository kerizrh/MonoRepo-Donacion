import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestService } from './services/test.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('frontend');
  mensaje = signal('Cargando...');

  constructor(private testService: TestService) {}

  ngOnInit(): void {
    this.testService.getMensaje().subscribe({
      next: (data) => this.mensaje.set(data),
      error: (err) => this.mensaje.set('Error al conectar con el backend')
    });
  }
}
