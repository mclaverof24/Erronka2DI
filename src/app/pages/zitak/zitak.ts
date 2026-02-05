import { Component, inject, signal } from '@angular/core';
import { DataService } from '../../services/data';
@Component({
  selector: 'app-produktuak',
  standalone: true,
  imports: [],
  templateUrl: './zitak.html',
  styleUrl: './zitak.css',
})
export class Produktuak {

  cliente = inject(DataService);
  data: any = signal(null);

  constructor() {
    this.cliente.getZitak().subscribe({
      next: (data) => {
        this.data.set(data);
        console.log('Datuak jaso dira:', data);
      },
      error: (err) => {
        console.error('Errorea datuak jasotzerakoan:', err);
      }
    });
  }
}
