import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

// Zutabe bakoitzaren konfigurazioa
export interface ZutabeKonfigurazioa {
  izena: string;      // Goiburuaren testua
  eremua: string;     // Datuetako propietatearen izena (adib: 'name', 'appoinments_services')
  mota?: 'testua' | 'data' | 'ordua' | 'zerbitzua' | 'ekintzak'; // Bistaratze mota
}

@Component({
  selector: 'app-taula',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './taula.html'
})
export class TaulaComponent implements OnInit {
  // Kanpotik jasotako datuak
  @Input() datuak: any[] = [];
  @Input() goiburuak: string[] = [];
  @Input() zutabeak: ZutabeKonfigurazioa[] = []; // Zutabe konfigurazioa (aukerakoa)
  
  // Botoia erakutsi ala ez kontrolatzeko
  @Input() erakutsiBotoia: boolean = true;
  @Input() editatuBotoia: boolean = false; // Editatu botoia erakutsi
  @Input() editatuRuta: string = ''; // Editatu botoiaren bideratzea

  // Paginaziorako aldagaiak
  currentPage: number = 1;
  itemsPerPage: number = environment.PaginationCount || 5;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // Orrialde bakoitzeko datu zatia kalkulatu
  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.datuak.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Nabigazio botoien funtzioak
  nextPage() {
    if ((this.currentPage * this.itemsPerPage) < this.datuak.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Fitxa irekitzeko bideratzea
  irekiFitxa(id: number) {
    this.router.navigate(['/bezeroak/fitxa', id]);
  }

  // Editatu orrira bideratu
  editatu(id: number) {
    if (this.editatuRuta) {
      this.router.navigate([this.editatuRuta, id]);
    }
  }

  // Balioa lortu elementutik, zutabe konfigurazioaren arabera
  getBalioa(item: any, zutabea: ZutabeKonfigurazioa): string {
    switch (zutabea.mota) {
      case 'data':
        return this.formatData(item[zutabea.eremua]);
      case 'ordua':
        return this.formatOrdua(item[zutabea.eremua]);
      case 'zerbitzua':
        return this.getZerbitzuak(item);
      case 'ekintzak':
        return '';
      default:
        return item[zutabea.eremua] || '-';
    }
  }

  // Data formatu erabilgarrian bihurtu (YYYY-MM-DD -> DD/MM/YYYY)
  private formatData(data: string): string {
    if (!data) return '-';
    const [urtea, hilabetea, eguna] = data.split('-');
    return `${eguna}/${hilabetea}/${urtea}`;
  }

  // Ordua formatu erabilgarrian bihurtu (HH:MM:SS -> HH:MM)
  private formatOrdua(ordua: string): string {
    if (!ordua) return '-';
    return ordua.substring(0, 5);
  }

  // Zerbitzuen izenak lortu appoinments_services-tik
  private getZerbitzuak(item: any): string {
    if (!item.appoinments_services || item.appoinments_services.length === 0) {
      return '-';
    }
    return item.appoinments_services.map((s: any) => s.comment).join(', ');
  }
}