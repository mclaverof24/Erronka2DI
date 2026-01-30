import { Routes } from '@angular/router';
import { BezeroakComponent } from './pages/bezeroak/bezeroak';
import { BezeroFitxaComponent } from './pages/bezero-fitxa/bezero-fitxa';
import { BezeroFormComponent } from './pages/bezero-form/bezero-form';

export const routes: Routes = [
  { path: '', redirectTo: 'bezeroak', pathMatch: 'full' },
  { path: 'bezeroak', component: BezeroakComponent },
  { path: 'bezeroak/fitxa/:id', component: BezeroFitxaComponent },
  { path: 'bezero-editatu/:id', component: BezeroFormComponent },
  { path: '**', redirectTo: 'bezeroak' }
];
