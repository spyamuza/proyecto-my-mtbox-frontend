import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class TmdbService {

  private http = inject(HttpClient);

  private urlBase= 'https://api.themoviedb.org/3';

  private apiKey = 'fe0bc0c946b02d95b1f56c14f9c0a182';




//-----------------peliculas---------------

//peliculas populares
getPopularMovies(): Observable<any> {
  return this.http.get(
    `${this.urlBase}/movie/popular?api_key=${this.apiKey}&language=es-ES`
  );
}


//peliculas actualmente en cartelera
getNowPlayingMovies(): Observable<any> {
  return this.http.get(
    `${this.urlBase}/movie/now_playing?api_key=${this.apiKey}&language=es-ES`
  );
}

//pelicula mejor valoradas
getTopRatedMovies(): Observable<any> {
  return this.http.get(
    `${this.urlBase}/movie/top_rated?api_key=${this.apiKey}&language=es-ES`
  );
}

//dettalle completo de pelicualas por id
//con routing parametrizado
  getMovieById(id: number): Observable<any> {
    return this.http.get(
      // Endpoint para una película concreta
      `${this.urlBase}/movie/${id}?api_key=${this.apiKey}&language=es-ES`
    );
  }

  //-----------------series---------------

//series populares
getPopularTvShows(): Observable<any> {
  return this.http.get(
    `${this.urlBase}/tv/popular?api_key=${this.apiKey}&language=es-ES`
  );
}

//series mejor valoradas
getTopRatedTvShows(): Observable<any> {
  return this.http.get(
    `${this.urlBase}/tv/top_rated?api_key=${this.apiKey}&language=es-ES`
  );
}

//dettalles completos de series por id
//con routing parametrizado
getTvShowById(id: number): Observable<any> {
  return this.http.get(
    // Endpoint para una serie concreta
    `${this.urlBase}/tv/${id}?api_key=${this.apiKey}&language=es-ES`
  );
}


// ---------------- TENDENCIAS (PELÍCULAS Y SERIES) ----------------

// tendencias del día
getTrendingToday(): Observable<any> {
  return this.http.get(
    `${this.urlBase}/trending/all/day?api_key=${this.apiKey}&language=es-ES`
  );
}

// tendencias de la semana
getTrendingWeek(): Observable<any> {
  return this.http.get(
    `${this.urlBase}/trending/all/week?api_key=${this.apiKey}&language=es-ES`
  );
}


//----------------------------------------------

// obtener todas las peliculas por paginación
getMovies(page: number = 1) {
  return this.http.get(
    `${this.urlBase}/discover/movie?api_key=${this.apiKey}&language=es-ES&page=${page}`
  );
}

//obtener todas las series por paginación
getTvShows(page: number = 1) {
  return this.http.get(
    `${this.urlBase}/discover/tv?api_key=${this.apiKey}&language=es-ES&page=${page}`
  );
}

// ---------------- para ficha ----------------

// (director y reparto)
getMovieCredits(id: number): Observable<any> {
  return this.http.get(
    `${this.urlBase}/movie/${id}/credits?api_key=${this.apiKey}&language=es-ES`
  );
}

// plataformas donde ver una película
getMovieProviders(id: number): Observable<any> {
  return this.http.get(
    `${this.urlBase}/movie/${id}/watch/providers?api_key=${this.apiKey}`
  );
}

//reparto serie
getTvCredits(id: number) {
  return this.http.get(
    `${this.urlBase}/tv/${id}/credits?api_key=${this.apiKey}&language=es-ES`
  );
}

// plataformas de una serie
getTvProviders(id: number) {
  return this.http.get(
    `${this.urlBase}/tv/${id}/watch/providers?api_key=${this.apiKey}`
  );
}


//search
searchMovies(query: string, page: number = 1) {
  return this.http.get(
    `${this.urlBase}/search/movie`,
    {
      params: {
        api_key: this.apiKey,
        query,
        page,
        language: 'es-ES'
      }
    }
  );
}

//filter
getMoviesByFilter(
  filter: 'popular' | 'now_playing' | 'upcoming' | 'top_rated',
  page: number = 1
) {
  return this.http.get(
    `${this.urlBase}/movie/${filter}`,
    {
      params: {
        api_key: this.apiKey,
        language: 'es-ES',
        page
      }
    }
  );
}

getTvByFilter(
  filter: 'popular' | 'on_the_air' | 'airing_today' | 'top_rated',
  page: number = 1
) {
  return this.http.get(
    `${this.urlBase}/tv/${filter}`,
    {
      params: {
        api_key: this.apiKey,
        language: 'es-ES',
        page
      }
    }
  );
}

// search series
searchTvShows(query: string, page: number = 1) {
  return this.http.get(
    `${this.urlBase}/search/tv`,
    {
      params: {
        api_key: this.apiKey,
        query,
        page,
        language: 'es-ES'
      }
    }
  );
}

// ---------------- VIDEOS (TRAILERS) ----------------

getMovieVideos(id: number) {
  return this.http.get<any>(
    `${this.urlBase}/movie/${id}/videos?api_key=${this.apiKey}&language=es-ES`
  );
}

getTvVideos(id: number) {
  return this.http.get<any>(
    `${this.urlBase}/tv/${id}/videos?api_key=${this.apiKey}&language=es-ES`
  );
}
}
