import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bezeroa } from '../interfaces/bezeroa.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private key = 'bezeroak_data';
  private jsonBezeroakPath = 'bezeroak.json'; 
  
  private bezeroak: Bezeroa[] = [];

  constructor(private http: HttpClient) {
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
      this.bezeroak[index] = { ...updatedBezeroa }; // Actualizamos el array
      this.saveToLocalStorage(); // <--- ESTO guarda los cambios "para siempre" en el navegador
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
}