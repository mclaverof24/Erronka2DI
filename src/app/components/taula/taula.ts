import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

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
  
  // Botoia erakutsi ala ez kontrolatzeko (Bezeroen zerrendan true, Fitxan false)
  @Input() erakutsiBotoia: boolean = true; 

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
}