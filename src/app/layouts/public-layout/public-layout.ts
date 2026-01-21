import { Component } from '@angular/core';
import { Header } from "../../components/header/header";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { Footer } from "../../components/footer/footer";
import { RouterOutlet } from '@angular/router';

 
@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [Header, NavBar, Footer, RouterOutlet],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css',
})
export class PublicLayout {

}
