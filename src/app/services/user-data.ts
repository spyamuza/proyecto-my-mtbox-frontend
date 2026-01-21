import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private user: any = null;
  private token: string | null = null;

  setUser(user: any, token: string): void {
    this.user = user;
    this.token = token;
  }

  getUser(): any {
    return this.user;
  }

  getToken(): string | null {
    return this.token;
  }

  isLogged(): boolean {
    return this.token !== null;
  }
  
//borrar sesión
  logout(): void {
    this.user = null;
    this.token = null;
  }
}