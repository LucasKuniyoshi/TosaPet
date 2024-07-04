// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AlertController } from '@ionic/angular';
// import { AlertService } from 'src/app/common/alert.service';
// import Petshop from 'src/app/model/entities/Petshop';
// import { AuthService } from 'src/app/model/services/auth.service';
// import { FirebaseService } from 'src/app/model/services/firebase.service';

// @Component({
//   selector: 'app-details',
//   templateUrl: './details.page.html',
//   styleUrls: ['./details.page.scss'],
// })
// export class DetailsPage implements OnInit {
//   petshop: Petshop;
//   lista_Petshops: Petshop[] = [];
//   imagem: any;
//   user: any;
//   formPetshop: FormGroup;
//   edicao: boolean = false;
//   public image: any;

//   constructor(
//     private alertController: AlertController, 
//     private router: Router, 
//     private firebase: FirebaseService,
//     private alertService: AlertService,
//     private auth: AuthService,
//     private formBuilder: FormBuilder
//   ) {
//     this.user = this.auth.getUserLogged();
    
//     // Inicialização do FormGroup
//     this.formPetshop = this.formBuilder.group({
//       name: ['', Validators.required],
//       dogType: ['', Validators.required],
//       address: ['', Validators.required],
//       contact: ['', Validators.required],
//       openingHours: ['', [Validators.required, Validators.min(0), Validators.max(24)]],
//       hourEnding: ['', [Validators.required, Validators.min(0), Validators.max(24)]],
//       rating: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
//       price: ['', Validators.required],
//       priceMax: ['', Validators.required],
//       stamp: ['', Validators.required]
//     });
//   }

//   ngOnInit() {
//     this.petshop = history.state.petshop;
//     if (this.petshop && this.formPetshop) {
//       this.formPetshop.patchValue({
//         name: this.petshop.name,
//         dogType: this.petshop.dogType,
//         address: this.petshop.address,
//         contact: this.petshop.contact,
//         openingHours: this.petshop.openingHours,
//         hourEnding: this.petshop.hourEnding,
//         rating: this.petshop.rating,
//         price: this.petshop.price,
//         priceMax: this.petshop.priceMax,
//         stamp: this.petshop.stamp
//       });
//     }
//   }

//   async presentAlert(subHeader: string, message: string) {
//     const alert = await this.alertController.create({
//       header: 'Biblioteca Pessoal',
//       subHeader: subHeader,
//       message: message,
//       buttons: ['OK'],
//     });

//     await alert.present();
//   }

//   uploadFile(image: any) {
//     this.image = image.files;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/common/alert.service';
import Petshop from 'src/app/model/entities/Petshop';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { UserfirebaseService } from 'src/app/model/services/userfirebase.service';
import { PetshopService } from 'src/app/model/services/petshop.service';
import User from 'src/app/model/entities/User';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  petshop: Petshop;
  lista_Petshops: Petshop[] = [];
  imagem: any;
  user: User | null = null;
  formPetshop: FormGroup;
  edicao: boolean = false;
  public image: any;
  isFavorite: boolean = false;

  constructor(
    private alertController: AlertController, 
    private router: Router, 
    private firebase: FirebaseService,
    private alertService: AlertService,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserfirebaseService,
    private petshopService: PetshopService
  ) {
    // Inicialização do FormGroup
    this.formPetshop = this.formBuilder.group({
      name: ['', Validators.required],
      dogType: ['', Validators.required],
      address: ['', Validators.required],
      contact: ['', Validators.required],
      openingHours: ['', [Validators.required, Validators.min(0), Validators.max(24)]],
      hourEnding: ['', [Validators.required, Validators.min(0), Validators.max(24)]],
      rating: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      price: ['', Validators.required],
      priceMax: ['', Validators.required],
      stamp: ['', Validators.required]
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
        price: this.petshop.price,
        priceMax: this.petshop.priceMax,
        stamp: this.petshop.stamp
      });
    }

    this.auth.getUserLogged().subscribe(user => {
      if (user) {
        this.user = user as User; // Cast to User type
        this.userService.getFavorites(user.uid).subscribe((userData) => {
          if (userData) {
            this.isFavorite = userData.favorites?.includes(this.petshop.id) || false;
          }
        });
      }
    });
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

  toggleFavorite() {
    if (this.user && this.petshop && this.user.uid && this.petshop.id) {
      if (this.isFavorite) {
        this.userService.removeFavorite(this.user.uid, this.petshop.id);
      } else {
        this.userService.addFavorite(this.user.uid, this.petshop.id);
      }
      this.isFavorite = !this.isFavorite;
    }
  }
}

