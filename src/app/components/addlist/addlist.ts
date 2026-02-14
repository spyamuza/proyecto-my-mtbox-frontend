import {
  Component,
  Input,
  inject,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from '../../services/api';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-addlist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addlist.html',
  styleUrls: ['./addlist.css'],
})
export class Addlist implements OnChanges {

  private api = inject(Api);
  private cdr = inject(ChangeDetectorRef);

  @Input() tmdbId!: number;

  
  @Input() esPelicula!: boolean;

  favorite = false;

  // null -> nada
  // true -> vista
  // false -> pendiente
  vista: boolean | null = null;
  notaUsuario: string | null = null;

  ngOnChanges(changes: SimpleChanges): void {

    if (this.tmdbId == null) {
      return;
    }

    if (typeof this.esPelicula !== 'boolean') {
      console.error(
        ' AddList: esPelicula NO definido. Revisa el HTML padre.',
        { tmdbId: this.tmdbId, esPelicula: this.esPelicula }
      );
      return;
    }

    this.cargarEstado();
  }

  // -----------------------------
  // GET /api/contenido
  // -----------------------------
  cargarEstado(): void {

    console.log(' cargarEstado()', {
      tmdbId: this.tmdbId,
      esPelicula: this.esPelicula
    });

    this.api.getContenido().subscribe({
      next: (contenidos: any[]) => {

        const item = contenidos.find(
          c =>
            Number(c.tmdbId) === Number(this.tmdbId) &&
            c.esPelicula === this.esPelicula
        );

        if (!item) {
          this.favorite = false;
          this.vista = null;
          this.notaUsuario = null;
          this.cdr.detectChanges();
          return;
        }

        this.favorite = item.favorito === true;

        if (item.vista === true) this.vista = true;
        else if (item.vista === false) this.vista = false;
        else this.vista = null;

        this.notaUsuario = item.notaUsuario ?? null;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Error cargando estado', err);
      }
    });
  }

  // -----------------------------
  // POST /api/contenido
  // -----------------------------
  guardarEstado(): void {

  if (typeof this.esPelicula !== 'boolean') {
    console.error(
      ' NO se guarda: esPelicula inválido',
      { tmdbId: this.tmdbId, esPelicula: this.esPelicula }
    );
    return;
  }

  let vistaBD: number | null = null;

  if (this.vista === true) vistaBD = 1;
  else if (this.vista === false) vistaBD = 0;

  const payload = {
    tmdbId: this.tmdbId,

    // CONVERSIÓN EXPLÍCITA 
    esPelicula: this.esPelicula === true ? 1 : 0,

    favorito: this.favorite ? 1 : 0,
    vista: vistaBD,
    notaUsuario: this.notaUsuario
  };

  console.log(' Payload enviado:', payload);

  this.api.createContenido(payload).subscribe({
    error: err => console.error(' Error guardando contenido', err)
  });
}

  // -----------------------------
  // TOGGLES
  // -----------------------------
  toggleFavorite(): void {
    this.favorite = !this.favorite;
    this.guardarEstado();
  }

  toggleVista(): void {
    this.vista = this.vista === true ? null : true;
    this.guardarEstado();
  }

  togglePendiente(): void {
    this.vista = this.vista === false ? null : false;
    this.guardarEstado();
  }

  isFavorito(): boolean {
    return this.favorite === true;
  }

  isVista(): boolean {
    return this.vista === true;
  }

  isPendiente(): boolean {
    return this.vista === false;
  }

  guardarNota(): void {
    this.guardarEstado();
  }
  eliminarNota(): void {
  this.notaUsuario = null;
  this.guardarEstado();
}
}