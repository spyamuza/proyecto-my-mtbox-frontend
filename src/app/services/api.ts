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
  return this.http.post(`${this.urlBase}/login`, data);
}

//registro
register(data:any): Observable<any> {
  return this.http.post(`${this.urlBase}/register`, data);  
}







}
