// toast.service.ts
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async presentToast(
    message: string,
    type: 'success' | 'error',
    position: 'top' | 'middle' | 'bottom' = 'bottom'
  ) {
    const cssClass = type === 'success' ? 'toast-success' : 'toast-error';
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position,
      cssClass,
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
        },
      ],
    });
    await toast.present();
  }
}
