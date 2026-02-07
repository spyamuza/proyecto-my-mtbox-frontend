import {
  Component,
  inject,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { UserDataService } from '../../services/user-data';
import { Api } from '../../services/api';
import { TmdbService } from '../../services/tmdb';
import { CardList } from '../../components/card-list/card-list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mi-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, CardList, RouterModule,CardList],
  templateUrl: './mi-registro.html',
  styleUrl: './mi-registro.css',
})
export class MiRegistro implements OnInit {

  private userDataService = inject(UserDataService);
  private router = inject(Router);
  private api = inject(Api);
  private tmdb = inject(TmdbService);
  private cdr = inject(ChangeDetectorRef);

  searchTerm = '';
  isSearching = false;

  // ==============================
  // FILTROS
  // ==============================
  listaFiltro: 'todo' | 'favoritos' | 'vistas' | 'pendientes' = 'todo';
  tipoFiltro: 'todo' | 'pelicula' | 'serie' = 'todo';
  ordenFiltro: 'az' | 'za' | 'fechaAsc' | 'fechaDesc' = 'az';

  // ==============================
  // VISTA
  // ==============================
  modoVista: 'lista' | 'tarjetas' = 'lista';

  // ==============================
  // DATOS
  // ==============================
  allItems: any[] = [];
  filteredItems: any[] = [];

  // ==============================
  // INIT
  // ==============================
  ngOnInit(): void {
    if (!this.userDataService.isLogged()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadRegistroEnriquecido();
  }

  // ==============================
  // SEARCH
  // ==============================
  onSearchChange(): void {
    const term = this.searchTerm.trim().toLowerCase();

    if (term.length === 0) {
      this.isSearching = false;
      this.applyFilters();
      return;
    }

    this.isSearching = true;

    this.filteredItems = this.allItems.filter(item =>
      (item.titulo || '').toLowerCase().includes(term)
    );

    this.applyFilters();
  }

  // ==============================
  // FILTROS
  // ==============================
  applyFilters(): void {

    // 🔴 CLAVE: partir de búsqueda si existe
    let items = this.isSearching
      ? [...this.filteredItems]
      : [...this.allItems];

    if (this.listaFiltro === 'favoritos') {
      items = items.filter(i => i.favorito === true);
    }

    if (this.listaFiltro === 'vistas') {
      items = items.filter(i => i.vista === true);
    }

    if (this.listaFiltro === 'pendientes') {
      items = items.filter(i => i.vista === false);
    }

    if (this.tipoFiltro === 'pelicula') {
      items = items.filter(i => i.esPelicula === true);
    }

    if (this.tipoFiltro === 'serie') {
      items = items.filter(i => i.esPelicula === false);
    }

    items.sort((a, b) => {
      switch (this.ordenFiltro) {
        case 'az':
          return (a.titulo || '').localeCompare(b.titulo || '');
        case 'za':
          return (b.titulo || '').localeCompare(a.titulo || '');
        case 'fechaAsc':
          return new Date(a.fecha || 0).getTime() - new Date(b.fecha || 0).getTime();
        case 'fechaDesc':
          return new Date(b.fecha || 0).getTime() - new Date(a.fecha || 0).getTime();
        default:
          return 0;
      }
    });

    this.filteredItems = items;
  }

  // ==============================
  // BD + TMDB
  // ==============================
  loadRegistroEnriquecido(): void {
    this.api.getContenido().subscribe({
      next: (items: any[]) => {

        if (!items || items.length === 0) {
          this.allItems = [];
          this.filteredItems = [];
          this.cdr.detectChanges();
          return;
        }

       const peticiones = items.map((item: any) => {

          if (!item.tmdbId) {
            return of(null);
          }

          // ✅ RESPETAR LO QUE DICE LA BD
          if (item.esPelicula === true) {
            return this.tmdb.getMovieById(item.tmdbId).pipe(
              map(tmdb => this.mergeItem(item, tmdb, true)),
              catchError(() => of(null))
            );
          }

          // ✅ SERIE
          return this.tmdb.getTvShowById(item.tmdbId).pipe(
            map(tmdb => this.mergeItem(item, tmdb, false)),
            catchError(() => of(null))
          );
        });

        forkJoin(peticiones).subscribe({
          next: (resultado: any[]) => {
            this.allItems = resultado.filter(i => i !== null);
            this.applyFilters();
            this.cdr.detectChanges();
          },
          error: err => {
            console.error('Error combinando BD + TMDB', err);
            this.allItems = [];
            this.filteredItems = [];
            this.cdr.detectChanges();
          }
        });
      },
      error: err => {
        console.error('Error cargando registro del usuario', err);
      }
    });
  }

  // ==============================
  // MERGE
  // ==============================
  private mergeItem(bdItem: any, tmdbItem: any, esPelicula: boolean) {
    return {
      ...bdItem,
      esPelicula,
      titulo: esPelicula ? tmdbItem.title : tmdbItem.name,
      fecha: esPelicula
        ? tmdbItem.release_date
        : tmdbItem.first_air_date,
      poster: tmdbItem.poster_path
        ? `https://image.tmdb.org/t/p/w342${tmdbItem.poster_path}`
        : null,
      rating: tmdbItem.vote_average ?? null
    };
  }

  onVistaLista(): void {
  this.modoVista = 'lista';
  this.loadRegistroEnriquecido(); // 🔄 recarga BD + TMDB
}
}