import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCard } from '../../components/list-card/list-card';
import { TmdbService } from '../../services/tmdb';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ListCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  
  private tmdb = inject(TmdbService);
  private cdr = inject(ChangeDetectorRef);

  items: any[] = [];
  loading = true;
  btnActive: 'day' | 'week' = 'day';

  ngOnInit(): void {
    this.cargarHoy();
  }

  cargarHoy(): void {
    this.loading = true;
    this.btnActive = 'day';

    this.tmdb.getTrendingToday().subscribe({
      next: (response: any) => {
        this.items = response.results;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.items = [];
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  cargarSemana(): void {
    this.loading = true;
    this.btnActive = 'week';

    this.tmdb.getTrendingWeek().subscribe({
      next: (response: any) => {
        this.items = response.results;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.items = [];
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
