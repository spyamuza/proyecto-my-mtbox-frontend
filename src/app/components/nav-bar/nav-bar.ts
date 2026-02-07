import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { UserDataService } from '../../services/user-data';


@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {

  // Inyectamos el servicio de usuario y el router
  private userDataService = inject(UserDataService);
  private router = inject(Router);

  // Método para saber si hay sesión iniciada
  isLogged(): boolean {
    return this.userDataService.isLogged();
  }

  // Método para cerrar sesión
  logout(): void {
    this.userDataService.logout();
    this.router.navigate(['/home']);
  }

}
