import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data';
import { Bezeroa } from '../../interfaces/bezeroa.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bezero-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bezero-form.html'
})
export class BezeroFormComponent implements OnInit {
  // Objeto inicial vacío
  bezeroa: Bezeroa = { id: 0, izena: '', email: '', herria: '', argazkia: '' };
  editatzen: boolean = false; // Nos servirá para cambiar el título en el HTML

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    // Si hay ID y no es "nuevo" (o el valor que uses para crear), cargamos datos
    if (id && id !== '0') {
      const existitzenDenBezeroa = this.dataService.getBezeroaById(Number(id));
      if (existitzenDenBezeroa) {
        this.bezeroa = { ...existitzenDenBezeroa };
        this.editatzen = true;
      }
    } else {
      // Si es nuevo, podemos poner una imagen por defecto
      this.bezeroa.argazkia = 'https://i.pravatar.cc/150?u=' + Math.random();
      this.editatzen = false;
    }
  }

  gorde() {
    if (this.editatzen) {
      // Si estamos editando, usamos update
      this.dataService.updateBezeroa(this.bezeroa);
    } else {
      // Si es nuevo, usamos add
      this.dataService.addBezeroa(this.bezeroa);
    }
    
    // Volvemos a la lista
    this.router.navigate(['/bezeroak']);
  }

  utzi() {
    if (this.editatzen) {
      // Si editábamos, volvemos a su ficha
      this.router.navigate(['/bezeroak/fitxa', this.bezeroa.id]);
    } else {
      // Si era nuevo, volvemos a la lista
      this.router.navigate(['/bezeroak']);
    }
  }
}