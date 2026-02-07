import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Addlist } from '../addlist/addlist';
import { UserDataService } from '../../services/user-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, RouterModule, Addlist],
  templateUrl: './card-list.html',
  styleUrl: './card-list.css',
})
export class CardList {

constructor(private router: Router) {}

navigate(): void {
  this.router.navigate(this.route);
} 
  @Input() item!: {
    tmdbId: number;
    titulo: string;
    fecha: string | null;
    poster: string | null;
    rating: number | null;
    esPelicula: boolean;
    favorito: boolean;
    vista: boolean | null;
  };

  private userData = inject(UserDataService);

  public isLogged(): boolean {
    return this.userData.isLogged();
  }

  get route(): any[] {
  return [
    '/ficha',
    this.item.esPelicula ? 'movie' : 'tv',
    this.item.tmdbId
  ];
}

  get image(): string {
    return this.item.poster ?? 'assets/no-image.jpg';
  }

  get typeLabel(): string {
    return this.item.esPelicula ? 'Película' : 'Serie';
  }

  get date(): string {
    return this.item.fecha ?? 'Fecha desconocida';
  }
}