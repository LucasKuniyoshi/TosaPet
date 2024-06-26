// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AlertService } from 'src/app/common/alert.service';
// import { AuthService } from 'src/app/model/services/auth.service';
// import { UserService } from 'src/app/model/services/user.service';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.page.html',
//   styleUrls: ['./signup.page.scss'],
// })
// export class SignupPage implements OnInit {
//   formCadastrar : FormGroup;

//   constructor(
//     private router: Router,
//     private alertService: AlertService,
//     private formBuilder: FormBuilder,
//     private authService: AuthService,
//     private userService: UserService // Adicione o UserService
//   ) {
//     this.formCadastrar = new FormGroup({
//       userName: new FormControl(''),
//       email: new FormControl(''),
//       phone: new FormControl(''),
//       senha: new FormControl(''),
//       confSenha: new FormControl('')
//     });
//   }

//    ngOnInit() {
//     this.formCadastrar = this.formBuilder.group({
//       userName: ['', [Validators.required, Validators.minLength(1)]],
//       email: ['', [Validators.required, Validators.email]], //required => campo obrigatorio / validacao de email
//       phone: ['', [Validators.required, Validators.minLength(8)]],
//       senha: ['', [Validators.required, Validators.minLength(6)]], //validacao de tamanha minimo
//       confSenha: ['', [Validators.required, Validators.minLength(6)]] //validacao de tamanha minimo
//     });
//   }

//   get errorControl(){
//     return this.formCadastrar.controls;
//   }

//   submitForm() : boolean{
//     if(!this.formCadastrar.valid){
//       this.alertService.presentAlert("Erro", "Erro ao Preencher campo!!")
//       return false;
//     }else{
//       this.alertService.simpleLoader();
//       this.cadastrar();
//       return true;
//     }
//   }
  
//   private cadastrar() {
//     const { email, senha, userName, phone } = this.formCadastrar.value;
//     this.authService.signUpWithEmailAndPassword(email, senha).then((res) => {
//       if (res.user) { // Adiciona verificação para res.user
//         this.alertService.dismissLoader();
//         this.alertService.presentAlert("Olá", "Cadastro realizado com sucesso");

//         // Armazene os dados do usuário no UserService
//         const userData = {
//           uid: res.user.uid,
//           email: res.user.email,
//           displayName: userName,
//           phone: phone
//         };
//         this.userService.setUser(userData);

//         this.router.navigate(['signin']); // Navega para a página de conta
//       } else {
//         this.alertService.dismissLoader();
//         this.alertService.presentAlert("Erro", "Erro ao cadastrar usuário");
//       }
//     })
//     .catch((error) => {
//       this.alertService.dismissLoader();
//       this.alertService.presentAlert("Erro", "Erro ao Logar");
//       console.log(error.message);
//     });
//   }
//     //then => deu tudo certo / catch => dispara a excecao de erro
// }
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
    const { userName, email, phone, dogType, senha } = this.formUser.value;
    try {
      const res = await this.authService.signUpWithEmailAndPassword(email, senha);
      if (res.user) {
        const userData: User = new User(userName, email, phone, dogType, senha, res.user.uid);
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


  // private cadastrar() {
  //   const { email, senha, userName, phone } = this.formUser.value; //aqui FORM
  //   this.authService.signUpWithEmailAndPassword(email, senha).then((res) => {
  //     if (res.user) {
  //       res.user.updateProfile({
  //         displayName: userName
  //       }).then(() => {
  //         this.alertService.dismissLoader();
  //         this.alertService.presentAlert("Olá", "Cadastro realizado com sucesso");

  //         // Armazene os dados adicionais do usuário no UserService
  //         const userData = {
  //           uid: res.user?.uid,
  //           email: res.user?.email,
  //           displayName: userName,
  //           phone: phone
  //         };
  //         this.userService.setUser(userData);

  //         this.router.navigate(['signin']);
  //       }).catch((error) => {
  //         this.alertService.dismissLoader();
  //         this.alertService.presentAlert("Erro", "Erro ao atualizar perfil");
  //         console.log(error.message);
  //       });
  //     } else {
  //       this.alertService.dismissLoader();
  //       this.alertService.presentAlert("Erro", "Erro ao cadastrar usuário");
  //     }
  //   }).catch((error) => {
  //     this.alertService.dismissLoader();
  //     this.alertService.presentAlert("Erro", "Erro ao Logar");
  //     console.log(error.message);
  //   });
  // }
}