import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../services/data';
import { Zita } from '../../interfaces/zita.interface';
import { TaulaComponent, ZutabeKonfigurazioa } from '../../components/taula/taula';

@Component({
  selector: 'app-zitak',
  standalone: true,
  imports: [CommonModule, RouterModule, TaulaComponent],
  templateUrl: './zitak.html',
  styleUrl: './zitak.css',
})
export class ZitakComponent implements OnInit {

  service = inject(DataService);
  zitakList: Zita[] = [];
  kargatzen: boolean = true;

  // Zutabe konfigurazioa
  zutabeak: ZutabeKonfigurazioa[] = [
    { izena: 'Izena', eremua: 'name', mota: 'testua' },
    { izena: 'Data', eremua: 'date', mota: 'data' },
    { izena: 'Hasiera', eremua: 'start_time', mota: 'ordua' },
    { izena: 'Amaiera', eremua: 'end_time', mota: 'ordua' },
    { izena: 'Eserlekua', eremua: 'seat', mota: 'testua' },
    { izena: 'Zerbitzua', eremua: 'comment', mota: 'testua' },
    { izena: 'Ekintzak', eremua: 'id', mota: 'ekintzak' }
  ];

  constructor() {}

  ngOnInit(): void {
    this.service.getZitak().subscribe({
      next: (data) => {
        // Ordenatu dataren arabera (zaharrenetik berrienera)
        this.zitakList = this.ordenatuDatarenArabera(data);
        this.kargatzen = false;
        console.log('Zitak jaso dira:', this.zitakList);
      },
      error: (err) => {
        console.error('Errorea zitak jasotzerakoan:', err);
        this.kargatzen = false;
      }
    });
  }

  // Ordenatu zitak dataren arabera (zaharrenetik berrienera)
  private ordenatuDatarenArabera(zitak: Zita[]): Zita[] {
    return [...zitak].sort((a, b) => {
      const dataA = new Date(a.date + 'T' + a.start_time);
      const dataB = new Date(b.date + 'T' + b.start_time);
      return dataA.getTime() - dataB.getTime();
    });
  }
}
