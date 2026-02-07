import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCard } from '../../components/list-card/list-card';
import { TmdbService } from '../../services/tmdb';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule, ListCard, FormsModule],
  templateUrl: './peliculas.html',
  styleUrl: './peliculas.css',
})
export class Peliculas implements OnInit {
  private tmdb = inject(TmdbService);
  private cdr = inject(ChangeDetectorRef);

//filter
filter: 'popular' | 'now_playing' | 'upcoming' | 'top_rated' = 'popular';

  //search
  searchTerm = '';
  isSearching = false;

  items: any[] = [];
  loading = true;
  currentPage = 1;
  page=1;
  totalPages = 1;



  ngOnInit(): void {
    this.loadMovies(this.currentPage);
  }

  loadMovies(page: number): void {
    this.loading = true;
    this.tmdb.getMovies(page).subscribe({
      next: (response: any) => {
        this.items = response.results;
        this.currentPage = response.page;
        this.totalPages = response.total_pages;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading movies:', err);
        this.items = [];
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

nextPage() {
  if (this.page < this.totalPages) {
    this.page++;
    this.loadMovies(this.page);
  }
}

prevPage() {
  if (this.page > 1) {
    this.page--;
    this.loadMovies(this.page);
  }
}

//search
onSearchChange(): void {
  const term = this.searchTerm.trim();

  if (term.length === 0) {
    // Volver al listado normal
    this.isSearching = false;
    this.loadMovies(1);
    return;
  }

  this.isSearching = true;
  this.loading = true;

  this.tmdb.searchMovies(term).subscribe({
    next: (response: any) => {
      this.items = response.results;
      this.totalPages = response.total_pages;
      this.currentPage = response.page;
      this.loading = false;
      this.cdr.detectChanges();
    },
    error: err => {
      console.error('Error buscando películas', err);
      this.items = [];
      this.loading = false;
      this.cdr.detectChanges();
    }
  });
}

onFilterChange(): void {
  this.page = 1;
  this.loadFilteredMovies();
}





loadFilteredMovies(): void {
  this.loading = true;
  this.isSearching = false;

  this.tmdb.getMoviesByFilter(this.filter, this.page).subscribe({
    next: (response: any) => {
      this.items = response.results;
      this.currentPage = response.page;
      this.totalPages = response.total_pages;
      this.loading = false;
      this.cdr.detectChanges();
    },
    error: err => {
      console.error('Error cargando películas filtradas', err);
      this.items = [];
      this.loading = false;
      this.cdr.detectChanges();
    }
  });
}


}



