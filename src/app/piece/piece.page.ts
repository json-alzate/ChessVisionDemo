import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonIcon, IonText, ModalController, IonLabel, IonButtons, IonRadioGroup, IonRadio, IonImg, IonNote } from '@ionic/angular/standalone';

import { Piece } from '../models/piece.model';
@Component({
  selector: 'app-piece',
  templateUrl: './piece.page.html',
  styleUrls: ['./piece.page.scss'],
  standalone: true,
  imports: [IonNote, IonImg, IonRadio, IonRadioGroup, IonButtons, IonLabel, IonText, IonIcon, IonButton, IonContent, CommonModule, FormsModule]
})
export class PiecePage implements OnInit {

  @Input() piece!: Piece;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  close() {
    this.modalCtrl.dismiss();
  }

}
