import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive], // Hau gabe estekek ez dute funtzionatuko
  templateUrl: './navbar.html'
})
export class NavbarComponent {}