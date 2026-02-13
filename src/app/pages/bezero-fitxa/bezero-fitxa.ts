import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Importa Router
import { DataService } from '../../services/data';
import { Bezeroa } from '../../interfaces/bezeroa.interface';
import { CommonModule } from '@angular/common';
import { TaulaComponent } from '../../components/taula/taula';

@Component({
  selector: 'app-bezero-fitxa',
  standalone: true,
  imports: [CommonModule, TaulaComponent],
  templateUrl: './bezero-fitxa.html'
})
export class BezeroFitxaComponent implements OnInit {
  bezeroa?: Bezeroa;
  zerbitzuak: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Inyecta el Router
    private dataService: DataService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getBezeroaByIdFromApi(id).subscribe({
      next: (bezeroa) => {
        this.bezeroa = bezeroa;
      },
      error: (err) => {
        console.error('Errorea bezeroa jasotzerakoan:', err);
      }
    });
  }

  // Nueva función para navegar al formulario de edición
  editatuProfila() {
    if (this.bezeroa) {
      this.router.navigate(['/bezero-editatu', this.bezeroa.id]);
    }
  }
}