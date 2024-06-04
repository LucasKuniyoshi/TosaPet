import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import Petshop from 'src/app/model/entities/Petshop';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public lista_Petshops :Petshop[] = [];
  public imagem : any;
  public user: any;
  formPetshop!: FormGroup;
  edicao: boolean = false;
  public name!: string;
  public dogType!: string;
  public address!: string;
  public contact!: string;
  public openingHours!: number;
  public hourEnding!: number;
  public rating!: number;
  public price!: number;

  constructor(private firebase: FirebaseService, 
    private router : Router,
    private auth : AuthService,
    private alertService : AlertService,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService)  {
      this.user = this.auth.getUserLogged(); 
      this.formPetshop = new FormGroup({
        name: new FormControl,
        dogType: new FormControl,
        address: new FormControl,
        contact: new FormControl,
        openingHours: new FormControl
      })
    }

  async cadastrar() {
    try {
      const {name, dogType, address, contact, openingHours, hourEnding, rating, price} = this.formPetshop.value;
      if (name && dogType && address && contact && openingHours && hourEnding && rating && price) {
        let novo:Petshop = new Petshop(name, dogType, address, contact, openingHours, hourEnding, rating, price);
        novo.uid = this.user.uid;
        if (this.imagem) {
          await this.firebase.uploadImage(this.imagem, novo);
        } else {
          await this.firebase.create(novo);
        }
        await this.alertService.dismissLoader();
        this.alertService.presentAlert("Sucesso", "PetPetshop Salvo!");
        this.router.navigate(["/home"]);
      } else {
        await this.alertService.dismissLoader();
        this.alertService.presentAlert("Erro", "Campos Obrigatórios!");
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      await this.alertService.dismissLoader(); // Certifique-se de ocultar o loader em caso de erro
      this.alertService.presentAlert("Erro", "Erro ao salvar oPetshop.");
    }
  }
  
  submitForm() : boolean{
    if(!this.formPetshop.valid){
      this.alertService.presentAlert("Erro", "Erro ao Preencher campo!!")
      return false;
    }else{
      this.alertService.simpleLoader();
      this.cadastrar();
      return true;
    }
  }
  
  get errorControl(){
    return this.formPetshop.controls;
  }

  uploadFile(imagem: any) {
    this.imagem = imagem.files
  }

  //name, dogType, address, contact, openingHours, hourEnding, rating, price
  ngOnInit() {
    this.user = this.auth.getUserLogged(); 
    this.formPetshop = this.formBuilder.group({
      name: ['', [Validators.required]],
      dogType: ['', [Validators.required]],
      address: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      openingHours: ['', [Validators.required]],
      hourEnding: ['', [Validators.required]],
      rating: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
    this.edicao = false;
  }
  habilitar() {
    this.edicao = !this.edicao;
    
    if (!this.edicao) {
      this.formPetshop.disable(); 
    } else {
      this.formPetshop.enable(); 
    }
  }

}
