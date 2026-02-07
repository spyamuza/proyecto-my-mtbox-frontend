import { Injectable, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class Api {
  
private http = inject(HttpClient);

private urlBase='http://localhost:8000/api';

//login
login(data:any): Observable<any> {
  return this.http.post(`${this.urlBase}/user/login`, data);
}

//registro
register(data:any): Observable<any> {
  return this.http.post(`${this.urlBase}/user/register`, data);  
}

// contenido POST
createContenido(data:any): Observable<any> {
  return this.http.post(`${this.urlBase}/contenido`, data);
}

// contenido GET
getContenido(): Observable<any> {
  return this.http.get(`${this.urlBase}/contenido`);
}

// contenido favoritos GET
getContenidoFavoritos(): Observable<any> {
  return this.http.get(`${this.urlBase}/contenido/favoritos`);
}



}
