import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import User from 'src/app/model/entities/User';
import { AuthService } from 'src/app/model/services/auth.service';
import { UserfirebaseService } from 'src/app/model/services/userfirebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  formUser: FormGroup;
  imagem: any;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserfirebaseService
  ) {
    this.formUser = new FormGroup({
      userName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      dogType: new FormControl(''),
      size: new FormControl(''),
      behavior: new FormControl(''),
      senha: new FormControl(''),
      confSenha: new FormControl('')
    });
  }

  ngOnInit() {
    this.formUser = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      dogType: ['', [Validators.required, Validators.minLength(1)]],
      size: ['', [Validators.required]],
      behavior: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confSenha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get errorControl() {
    return this.formUser.controls;
  }

  uploadFile(imagem: any) {
    this.imagem = imagem.files;
  }

  async submitForm() {
    if (!this.formUser.valid) {
      this.alertService.presentAlert("Erro", "Erro ao Preencher campo!!");
      return false;
    } else {
      this.alertService.simpleLoader();
      await this.cadastrar();
      return true;
    }
  }

  async cadastrar() {
    const { userName, email, phone, dogType, size, behavior, senha } = this.formUser.value;
    try {
      const res = await this.authService.signUpWithEmailAndPassword(email, senha);
      if (res.user) {
        const userData: User = new User(userName, email, phone, dogType, size, behavior, senha, res.user.uid);
        if (this.imagem) {
          await this.userService.uploadImage(this.imagem, userData);
        } else {
          await this.userService.create(userData);
        }
        this.alertService.dismissLoader();
        this.alertService.presentAlert("Sucesso", "Cadastro realizado!");
        this.router.navigate(["/signin"]);
      } else {
        this.alertService.dismissLoader();
        this.alertService.presentAlert("Erro", "Erro ao cadastrar usuário");
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      this.alertService.dismissLoader();
      this.alertService.presentAlert("Erro", "Erro ao criar cadastro.");
    }
  }
}