import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { NavBar } from '../../components/nav-bar/nav-bar';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
        
    NavBar,
    Footer
  ],
  templateUrl: './private-layout.html',
  styleUrl: './private-layout.css',
})
export class PrivateLayout {}