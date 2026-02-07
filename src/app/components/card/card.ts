import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Addlist } from '../addlist/addlist';
import { UserDataService } from '../../services/user-data';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, Addlist, RouterModule],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  constructor(private router: Router) {}

  navigate(): void {
    this.router.navigate(this.route);
  }

  private userData = inject(UserDataService);

  @Input() item!: any;

  // ==============================
  // ROUTE A FICHA
  // ==============================
  get route(): any[] {
    const type =
      this.item?.media_type === 'tv' || this.item?.first_air_date
        ? 'tv'
        : 'movie';

    return ['/ficha', type, this.item.id];
  }

  // ==============================
  // TÍTULO
  // ==============================
  get title(): string {
    return this.item.title || this.item.name || 'Sin título';
  }

  // ==============================
  // FECHA
  // ==============================
  get date(): string {
    return this.item.release_date || this.item.first_air_date || '';
  }

  // ==============================
  // TIPO (texto)
  // ==============================
  get type(): 'Película' | 'Serie' {
    if (this.item.media_type) {
      return this.item.media_type === 'tv' ? 'Serie' : 'Película';
    }

    if (this.item.first_air_date) {
      return 'Serie';
    }

    return 'Película';
  }

  // ==============================
  // ES PELÍCULA (boolean REAL)
  // ==============================
  get esPelicula(): boolean {
  // Si viene media_type (trending)
  if (this.item.media_type) {
    return this.item.media_type === 'movie';
  }

  // Fallback robusto
  return !this.item.first_air_date;
}

  // ==============================
  // POSTER
  // ==============================
  get imageUrl(): string {
    return this.item.poster_path
      ? `https://image.tmdb.org/t/p/w500${this.item.poster_path}`
      : 'https://via.placeholder.com/300x450?text=Sin+imagen';
  }

  // ==============================
  // SESIÓN
  // ==============================
  isLogged(): boolean {
    return this.userData.isLogged();
  }

get tmdbId(): number {
  return this.item.id;
}



}