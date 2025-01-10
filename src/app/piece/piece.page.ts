import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonText } from '@ionic/angular/standalone';

import { Piece } from '../models/piece.model';
@Component({
  selector: 'app-piece',
  templateUrl: './piece.page.html',
  styleUrls: ['./piece.page.scss'],
  standalone: true,
  imports: [IonText, IonCol, IonRow, IonGrid, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PiecePage implements OnInit {

  @Input() piece!: Piece;

  constructor() { }

  ngOnInit() {
    console.log(this.piece);
  }

}
