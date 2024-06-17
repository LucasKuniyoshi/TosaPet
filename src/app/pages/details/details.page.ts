import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/common/alert.service';
import Petshop from 'src/app/model/entities/Petshop';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  petshop: Petshop;
  lista_Petshops: Petshop[] = [];
  imagem: any;
  user: any;
  formPetshop: FormGroup;
  edicao: boolean = false;
  public image: any;

  constructor(
    private alertController: AlertController, 
    private router: Router, 
    private firebase: FirebaseService,
    private alertService: AlertService,
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.user = this.auth.getUserLogged();
    
    // Inicialização do FormGroup
    this.formPetshop = this.formBuilder.group({
      name: ['', Validators.required],
      dogType: ['', Validators.required],
      address: ['', Validators.required],
      contact: ['', Validators.required],
      openingHours: ['', [Validators.required, Validators.min(0), Validators.max(24)]],
      hourEnding: ['', [Validators.required, Validators.min(0), Validators.max(24)]],
      rating: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      price: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.petshop = history.state.petshop;
    if (this.petshop && this.formPetshop) {
      this.formPetshop.patchValue({
        name: this.petshop.name,
        dogType: this.petshop.dogType,
        address: this.petshop.address,
        contact: this.petshop.contact,
        openingHours: this.petshop.openingHours,
        hourEnding: this.petshop.hourEnding,
        rating: this.petshop.rating,
        price: this.petshop.price
      });
    }
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Biblioteca Pessoal',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  uploadFile(image: any) {
    this.image = image.files;
  }
}
