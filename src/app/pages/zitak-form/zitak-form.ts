import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data';
import { Zita } from '../../interfaces/zita.interface';
import { Bezeroa } from '../../interfaces/bezeroa.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zitak-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './zitak-form.html',
  styleUrl: './zitak-form.css',
})
export class ZitakFormComponent implements OnInit {
  // Objeto inicial vacío
  zita: Zita = {
    id: 0,
    name: '',
    date: '',
    start_time: '',
    end_time: '',
    seat: 1,
    comment: '',
    info: null,
    appoinments_services: []
  };
  editatzen: boolean = false;
  bezeroak: Bezeroa[] = [];
  selectedClientId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    // Kargatu bezeroak desplegagarrian erakusteko
    this.dataService.getBezeroakFromApi().subscribe({
      next: (bezeroak) => {
        this.bezeroak = bezeroak;
      },
      error: (err) => {
        console.error('Errorea bezeroak kargatzerakoan:', err);
      }
    });

    const id = this.route.snapshot.paramMap.get('id');

    // Si hay ID y no es "0", cargamos datos
    if (id && id !== '0') {
      this.dataService.getZitaById(Number(id)).subscribe({
        next: (zita) => {
          this.zita = { ...zita };
          this.editatzen = true;
          // Editatzen denean, erabili dagoen client ID
          // Nota: API erantzunak ez du client ID zuzenik, beraz 0 utziko dugu
          this.selectedClientId = 0;
        },
        error: (err) => {
          console.error('Errorea zita jasotzerakoan:', err);
        }
      });
    } else {
      this.editatzen = false;
    }
  }

  gorde() {
    // Asegurar formato correcto de hora (HH:MM:SS)
    const startTime = this.zita.start_time.length === 5 ? this.zita.start_time + ':00' : this.zita.start_time;
    const endTime = this.zita.end_time.length === 5 ? this.zita.end_time + ':00' : this.zita.end_time;
    
    if (this.editatzen) {
      // PUT - Actualizar zita existente
      const zitaToUpdate = {
        seat: Number(this.zita.seat),
        date: this.zita.date,
        start_time: startTime,
        end_time: endTime,
        comment: this.zita.comment,
        name: this.zita.name
      };
      
      console.log('PUT - Datuak bidaltzen:', JSON.stringify(zitaToUpdate, null, 2));
      console.log('Zita ID:', this.zita.id);
      
      this.dataService.updateZita(this.zita.id, zitaToUpdate).subscribe({
        next: (response) => {
          console.log('Zita eguneratu - erantzuna:', response);
          this.router.navigate(['/zitak']);
        },
        error: (err) => {
          console.error('Errorea zita eguneratzerakoan:', err);
          console.error('Errore xehetasunak:', err.error);
          alert('Errorea zita eguneratzerakoan. Kontsola ikusi.');
        }
      });
    } else {
      // POST - Crear zita nueva
      const zitaToCreate = {
        seat: Number(this.zita.seat),
        date: this.zita.date,
        start_time: startTime,
        end_time: endTime,
        comment: this.zita.comment || '',
        name: this.zita.name,
        students: { id: 1 },  // Estudiante ID fijo: 1
        clients: { id: this.selectedClientId }  // Bezeroa aukeratutakoa
      };
      
      console.log('Datuak bidaltzen:', JSON.stringify(zitaToCreate, null, 2));
      
      this.dataService.createZita(zitaToCreate).subscribe({
        next: (response) => {
          console.log('Zita berria sortu:', response);
          this.router.navigate(['/zitak']);
        },
        error: (err) => {
          console.error('Errorea zita sortzerakoan:', err);
          console.error('Errore xehetasunak:', err.error);
          alert('Errorea zita sortzerakoan. Kontsola ikusi.');
        }
      });
    }
  }

  utzi() {
    this.router.navigate(['/zitak']);
  }
}
