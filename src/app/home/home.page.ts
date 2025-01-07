import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonProgressBar, IonFab, IonFabButton, IonIcon,
  IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent
} from '@ionic/angular/standalone';

import { Camera, CameraResultType } from '@capacitor/camera';
// @ts-ignore
import * as ml5 from 'ml5';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonProgressBar, IonFab, IonFabButton, IonIcon, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent],
})
export class HomePage {

  loading = false;

  urlImg!: string | undefined;
  classifier!: ml5.ImageClassifier;
  predictionResult!: string;

  constructor() { }

  async takePicture() {
    this.loading = true;
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
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
