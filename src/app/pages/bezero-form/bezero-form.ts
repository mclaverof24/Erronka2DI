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
  bezeroa: Bezeroa = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    phone: '',
    home_client: false,
    info: null
  };
  editatzen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    // Si hay ID y no es "0", cargamos datos desde la API
    if (id && id !== '0') {
      this.dataService.getBezeroaByIdFromApi(Number(id)).subscribe({
        next: (bezeroa) => {
          this.bezeroa = { ...bezeroa };
          this.editatzen = true;
        },
        error: (err) => {
          console.error('Errorea bezeroa jasotzerakoan:', err);
        }
      });
    } else {
      this.editatzen = false;
    }
  }

  gorde() {
    const bezeroaData = {
      name: this.bezeroa.name,
      surname: this.bezeroa.surname,
      email: this.bezeroa.email,
      phone: this.bezeroa.phone,
      home_client: this.bezeroa.home_client
    };

    if (this.editatzen) {
      // PUT - Actualizar bezeroa
      this.dataService.updateBezeroaInApi(this.bezeroa.id, bezeroaData as Bezeroa).subscribe({
        next: () => {
          console.log('Bezeroa eguneratu:', this.bezeroa);
          this.router.navigate(['/bezeroak']);
        },
        error: (err) => {
          console.error('Errorea bezeroa eguneratzerakoan:', err);
        }
      });
    } else {
      // POST - Crear bezero berria
      this.dataService.createBezeroa(bezeroaData as Bezeroa).subscribe({
        next: () => {
          console.log('Bezero berria sortu:', bezeroaData);
          this.router.navigate(['/bezeroak']);
        },
        error: (err) => {
          console.error('Errorea bezeroa sortzerakoan:', err);
        }
      });
    }
  }

  utzi() {
    if (this.editatzen) {
      this.router.navigate(['/bezeroak/fitxa', this.bezeroa.id]);
    } else {
      this.router.navigate(['/bezeroak']);
    }
  }
}
