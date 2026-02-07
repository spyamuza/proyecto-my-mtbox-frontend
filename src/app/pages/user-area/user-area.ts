import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../../services/user-data';

@Component({
  selector: 'app-user-area',
  imports: [],
  templateUrl: './user-area.html',
  styleUrl: './user-area.css',
})
export class UserArea {

  // Inyectamos el servicio de usuario y el router
  private userDataService = inject(UserDataService);
  private router = inject(Router);

  // Al iniciar el componente, verificamos si hay sesión iniciada
  ngOnInit(): void {
    if (!this.userDataService.isLogged()) {
      // Si no hay sesión, redirigimos al login
      this.router.navigate(['/login']);
    }
  }

}
