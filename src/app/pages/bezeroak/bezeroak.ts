import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; 
import { DataService } from '../../services/data';
import { Bezeroa } from '../../interfaces/bezeroa.interface';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-bezeroak-page',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './bezeroak.html'
})
export class BezeroakComponent implements OnInit {
  bezeroak: Bezeroa[] = [];
  kargatzen: boolean = true;
  
  currentPage: number = 1;
  itemsPerPage: number = environment.PaginationCount || 5;

  constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    // API-tik bezeroak kargatu
    this.dataService.getBezeroakFromApi().subscribe({
      next: (data) => {
        this.bezeroak = data;
        this.kargatzen = false;
        console.log('Bezeroak API-tik jaso dira:', data);
      },
      error: (err) => {
        console.error('Errorea bezeroak jasotzerakoan:', err);
        this.kargatzen = false;
      }
    });
  }

  // Orrialde bakoitzeko datu zatia kalkulatu
  get paginatedBezeroak() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.bezeroak.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.bezeroak.length / this.itemsPerPage);
  }

  // Nabigazio botoien funtzioak
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  irekiFitxa(id: number) {
    this.router.navigate(['/bezeroak/fitxa', id]);
  }
}