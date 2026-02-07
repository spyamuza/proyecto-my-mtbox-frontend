import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCard } from '../../components/list-card/list-card';
import { TmdbService } from '../../services/tmdb';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [CommonModule, ListCard, FormsModule],
  templateUrl: './series.html',
  styleUrl: './series.css',
})
export class Series implements OnInit {

  private tmdb = inject(TmdbService);
  private cdr = inject(ChangeDetectorRef);

  // 🔽 filtros TV (OJO con los valores)
  filter: 'popular' | 'on_the_air' | 'airing_today' | 'top_rated' = 'popular';

  // 🔍 búsqueda
  searchTerm = '';
  isSearching = false;

  items: any[] = [];
  loading = true;
  currentPage = 1;
  page = 1;
  totalPages = 1;

  ngOnInit(): void {
    this.loadSeries(this.currentPage);
  }

  // ---------- CARGA NORMAL ----------
  loadSeries(page: number): void {
    this.loading = true;

    this.tmdb.getTvShows(page).subscribe({
      next: (response: any) => {
        this.items = response.results;
        this.currentPage = response.page;
        this.totalPages = response.total_pages;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Error cargando series', err);
        this.items = [];
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  
nextPage() {
  if (this.page < this.totalPages) {
    this.page++;
    this.loadSeries(this.page);
  }
}

prevPage() {
  if (this.page > 1) {
    this.page--;
    this.loadSeries(this.page);
  }
}

  // ---------- BÚSQUEDA ----------
  onSearchChange(): void {
    const term = this.searchTerm.trim();

    if (!term) {
      this.isSearching = false;
      this.loadSeries(1);
      return;
    }

    this.isSearching = true;
    this.loading = true;

    this.tmdb.searchTvShows(term).subscribe({
      next: (response: any) => {
        this.items = response.results;
        this.currentPage = response.page;
        this.totalPages = response.total_pages;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Error buscando series', err);
        this.items = [];
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // ---------- FILTRO ----------
  onFilterChange(): void {
    this.page = 1;
    this.loadFilteredSeries();
  }

  loadFilteredSeries(): void {
    this.loading = true;
    this.isSearching = false;

    this.tmdb.getTvByFilter(this.filter, this.page).subscribe({
      next: (response: any) => {
        this.items = response.results;
        this.currentPage = response.page;
        this.totalPages = response.total_pages;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Error cargando series filtradas', err);
        this.items = [];
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}