import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  showHonor: boolean = false;

  constructor(private alertController: AlertController) {}

  toggleTheme(event: any) {
    if (event.detail.checked) {
      document.body.setAttribute('color-theme', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
    }
  }

  async showAppInfo() {
    const alert = await this.alertController.create({
      header: 'Sobre o aplicativo',
      message: 'TosaPet é um aplicativo voltado a encontrar serviços personalizados de pet shops, com classificações, média de preço e horários de funcionamento. Personalize sua experiência visitando outras abas.',
      buttons: ['OK']
    });

    await alert.present();
  }

  toggleHonorMention() {
    this.showHonor = !this.showHonor;
  }
}
