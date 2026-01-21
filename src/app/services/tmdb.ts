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



  

}
