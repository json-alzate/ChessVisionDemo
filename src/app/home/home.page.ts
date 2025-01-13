import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonContent, IonCard, IonProgressBar,
  IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonRippleEffect, ModalController
} from '@ionic/angular/standalone';

import { Camera, CameraResultType } from '@capacitor/camera';
// @ts-ignore
import * as ml5 from 'ml5';

import { register } from 'swiper/element/bundle';
register();


import { Piece } from '../models/piece.model';

import { PiecePage } from '../piece/piece.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule,
    IonRippleEffect, IonContent, IonCard, IonProgressBar, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent],
})
export class HomePage {

  pieces: Piece[] = [
    {
      id: 5,
      name: 'Rey',
      image: '/assets/images/king.jpg',
      description: 'Es la pieza principal del ajedrez. Se mueve una casilla en cualquier dirección (horizontal, vertical o diagonal). Aunque no tiene un valor numérico como otras piezas, perderlo significa el fin de la partida.',
      moveDescription: 'El rey es lento'
    },
    {
      id: 6,
      name: 'Dama',
      image: '/assets/images/queen.jpg',
      description: 'La pieza más poderosa del tablero. Puede moverse cualquier número de casillas en línea recta, ya sea horizontal, vertical o diagonal. Su combinación de movimientos la convierte en una herramienta clave para atacar y defender.',
      moveDescription: 'Dama = Torre + Alfil'
    },
    {
      id: 4,
      name: 'Torre',
      image: '/assets/images/rook.jpg',
      description: 'Se mueve en línea recta de forma ilimitada, pero solo en direcciones horizontales o verticales. Es muy útil para dominar filas y columnas abiertas en el tablero.',
      moveDescription: 'Se mueve en línea recta'
    },
    {
      id: 2,
      name: 'Alfil',
      image: 'assets/images/bishop.jpg',
      description: 'Se mueve en diagonal tantas casillas como desee. Cada alfil está limitado a casillas de un solo color, por lo que se complementa con el otro alfil del equipo para cubrir el tablero.',
      moveDescription: 'Se mueve en diagonal'
    },
    {
      id: 3,
      name: 'Caballo',
      image: '/assets/images/knight.jpg',
      description: 'Se mueve en forma de "L" (dos casillas en una dirección y una en otra perpendicular). Es la única pieza que puede saltar sobre otras, lo que lo hace especialmente valioso en posiciones cerradas.',
      moveDescription: 'Se mueve en forma de L'
    },
    {
      id: 1,
      name: 'Peon',
      image: 'assets/images/pawn.jpg',
      description: 'Son los mas numerosos y aparentemente más débiles, pero tiene un rol estratégico crucial. Avanza una casilla (o dos en su primer movimiento) y captura en diagonal. Si llega al final del tablero, puede transformarse en cualquier pieza (excepto el rey), lo que le da un gran potencial.',
      moveDescription: 'Sólo mueve hacia adelante, "son el alma del ajedrez"'
    }
  ];

  loading = false;
  urlImg!: string | undefined;
  classifier!: ml5.ImageClassifier;
  predictionResult!: string;

  constructor(
    private modalCtrl: ModalController
  ) { }

  async takePicture() {
    this.loading = true;
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Base64,
    });

    const imageUrl = image.base64String as string;
    this.urlImg = imageUrl;

    // Load model if it's not loaded yet
    if (!this.classifier) {
      await this.loadModel();
    }

    // Predict the label
    this.predictionResult = await this.predict(imageUrl);
    this.loading = false;
  }


  async openModal(piece: Piece) {
    const modal = await this.modalCtrl.create({
      component: PiecePage,
      componentProps: { piece },
      initialBreakpoint: 0.8,
      breakpoints: [0, 0.5, 0.8, 1],
    });
    modal.present();

  }

  async loadModel() {
    // Load a model using ml5
    this.classifier = await ml5.imageClassifier('/assets/tm-my-image-model/model.json');
  }

  async predict(base64Image: string) {
    // Convert base64 image to HTMLImageElement
    const image = new Image();
    image.src = 'data:image/jpeg;base64,' + base64Image;

    await new Promise((resolve) => (image.onload = resolve));

    // Run prediction
    const results = await this.classifier.classify(image);

    // Find the prediction with the highest probability
    if (results.length > 0) {
      const bestPrediction = results[0];
      return bestPrediction.label;
    }

    return 'No se pudo clasificar la imagen';
  }
}
