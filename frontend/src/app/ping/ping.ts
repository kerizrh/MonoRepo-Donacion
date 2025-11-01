import { Component, OnInit } from '@angular/core';
import { PingService } from '../ping';

@Component({
  selector: 'app-ping',
  standalone: false,
  templateUrl: './ping.html',
  styleUrl: './ping.css'
})
export class Ping implements OnInit {
  mensaje = '';

  constructor(private pingService: PingService) {}

  ngOnInit(): void {
    this.pingService.getPing().subscribe(res => this.mensaje = res);
  }
}
