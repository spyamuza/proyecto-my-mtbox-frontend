import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb';
import { Location } from '@angular/common';
import { UserDataService } from '../../services/user-data';

import { Addlist } from '../addlist/addlist';




@Component({
  selector: 'app-ficha',
  standalone: true,
  imports: [CommonModule, Addlist],
  templateUrl: './ficha.html',
  styleUrl: './ficha.css',
})
export class Ficha implements OnInit {

  private route = inject(ActivatedRoute);
  private tmdb = inject(TmdbService);
  private cdr = inject(ChangeDetectorRef);
  private location = inject(Location);  
  public userData = inject(UserDataService);

  tmdbId!: number;
  esPelicula!: boolean;

  loading = true;

  pelicula: any = null;
  director = '';
  reparto: any[] = [];
  plataformas: any[] = [];

  type!: 'movie' | 'tv';

  ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  const typeParam = this.route.snapshot.paramMap.get('type') as 'movie' | 'tv';

  if (!id || !typeParam) return;

  this.tmdbId = id;
  this.type = typeParam;              // ← guardar tipo
  this.esPelicula = typeParam === 'movie';

  this.loading = true;

  if (this.esPelicula) {
    this.cargarPelicula(id);
  } else {
    this.cargarSerie(id);
  }
}

  //------peliculas--------

  
  cargarPelicula(id: number): void {

    this.tmdb.getMovieById(id).subscribe((data: any) => {
      this.pelicula = data;
      this.loading = false;
      this.cdr.detectChanges();
    });

    this.tmdb.getMovieCredits(id).subscribe((data: any) => {
      this.director =
        data.crew.find((m: any) => m.job === 'Director')?.name || '';
      this.reparto = data.cast.slice(0, 10);
      this.cdr.detectChanges();
    });

    this.tmdb.getMovieProviders(id).subscribe((data: any) => {
      this.plataformas = data.results?.ES?.flatrate || [];
      this.cdr.detectChanges();
    });
  }

  //------series--------

  cargarSerie(id: number): void {

    this.tmdb.getTvShowById(id).subscribe((data: any) => {
      this.pelicula = data;

      //director
      this.director =
        data?.created_by?.[0]?.name || '';

      this.loading = false;
      this.cdr.detectChanges();
    });

    this.tmdb.getTvCredits(id).subscribe((data: any) => {
      this.director =
        data.crew.find((m: any) => m.job === 'Creator')?.name || '';
      this.reparto = data.cast.slice(0, 10);
      this.cdr.detectChanges();
    });

    this.tmdb.getTvProviders(id).subscribe((data: any) => {
      this.plataformas = data.results?.ES?.flatrate || [];
      this.cdr.detectChanges();
    });
  }
  
  volver(): void {
    this.location.back();
  }
}