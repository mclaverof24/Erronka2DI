import { Routes } from '@angular/router';
import { BezeroakComponent } from './pages/bezeroak/bezeroak';
import { BezeroFitxaComponent } from './pages/bezero-fitxa/bezero-fitxa';
import { BezeroFormComponent } from './pages/bezero-form/bezero-form';
import { ZitakComponent } from './pages/zitak/zitak';
import { ZitakFormComponent } from './pages/zitak-form/zitak-form';

export const routes: Routes = [
  { path: 'bezeroak', component: BezeroakComponent },
  { path: 'bezeroak/fitxa/:id', component: BezeroFitxaComponent },
  { path: 'bezero-editatu/:id', component: BezeroFormComponent },
  { path: 'zitak', component: ZitakComponent },
  { path: 'zita-editatu/:id', component: ZitakFormComponent },
  { path: '', redirectTo: 'bezeroak', pathMatch: 'full' }
];
