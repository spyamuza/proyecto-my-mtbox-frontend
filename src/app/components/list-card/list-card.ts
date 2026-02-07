import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card} from '../card/card';


@Component({
  selector: 'app-list-card',
  standalone: true,
  imports: [ Card, CommonModule],
  templateUrl: './list-card.html',
  styleUrl: './list-card.css',
})
export class ListCard {

@Input() items: any[]=[];



}
