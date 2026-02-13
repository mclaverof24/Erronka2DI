import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bezeroa } from '../interfaces/bezeroa.interface';
import { Zita } from '../interfaces/zita.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private key = 'bezeroak_data';
  private jsonBezeroakPath = 'bezeroak.json'; 
  private http = inject(HttpClient);
  private apiUrl = "/api";
  data = null;
  
  private bezeroak: Bezeroa[] = [];

  constructor(http: HttpClient) {
    this.initData();
  }

  private initData() {
    const savedData = localStorage.getItem(this.key);
    
    // LocalStorage-n datuak badaude, horiek erabili
    if (savedData && savedData !== '[]') {
      this.bezeroak = JSON.parse(savedData);
    } else {
      // Ez badago ezer, JSON fitxategira joan
      this.http.get<Bezeroa[]>(this.jsonBezeroakPath).subscribe({
        next: (data) => {
          this.bezeroak = data;
          this.saveToLocalStorage();
        },
        error: (err) => {
          console.error('JSON fitxategia ez da aurkitu assets/bezeroak.json bidean', err);
        }
      });
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.key, JSON.stringify(this.bezeroak));
  }

  getBezeroak(): Bezeroa[] {
    return this.bezeroak;
  }

  getBezeroaById(id: number): Bezeroa | undefined {
    return this.bezeroak.find(b => b.id === id);
  }

  updateBezeroa(updatedBezeroa: Bezeroa) {
    const index = this.bezeroak.findIndex(b => b.id === updatedBezeroa.id);
    if (index !== -1) {
      this.bezeroak[index] = { ...updatedBezeroa }; 
      this.saveToLocalStorage(); 
    }
  }

  addBezeroa(newBezeroa: Bezeroa) {
    // ID handiena bilatu eta +1 eman
    const maxId = this.bezeroak.length > 0 
      ? Math.max(...this.bezeroak.map(b => b.id)) 
      : 0;
    
    newBezeroa.id = maxId + 1;
    this.bezeroak.push(newBezeroa);
    this.saveToLocalStorage();
  }

  getZitak(): Observable<Zita[]> {
    return this.http.get<Zita[]>(this.apiUrl + '/appointment');
  }

  getZitaById(id: number): Observable<Zita> {
    return this.http.get<Zita>(this.apiUrl + '/appointment/' + id);
  }

  // POST - Sortu zita berria
  createZita(zita: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/appointment', zita);
  }

  // PUT - Eguneratu zita
  updateZita(id: number, zita: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/appointment/' + id, zita);
  }

  // CLIENTES / BEZEROAK - API metodoak
  
  // GET - Lortu bezero guztiak
  getBezeroakFromApi(): Observable<Bezeroa[]> {
    return this.http.get<Bezeroa[]>(this.apiUrl + '/client');
  }

  // GET - Lortu bezeroa ID-aren arabera
  getBezeroaByIdFromApi(id: number): Observable<Bezeroa> {
    return this.http.get<Bezeroa>(this.apiUrl + '/client/' + id);
  }

  // POST - Sortu bezero berria
  createBezeroa(bezeroa: Bezeroa): Observable<Bezeroa> {
    return this.http.post<Bezeroa>(this.apiUrl + '/client', bezeroa);
  }

  // PUT - Eguneratu bezeroa
  updateBezeroaInApi(id: number, bezeroa: Bezeroa): Observable<Bezeroa> {
    return this.http.put<Bezeroa>(this.apiUrl + '/client/' + id, bezeroa);
  }

}

