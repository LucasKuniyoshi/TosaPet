// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
// import { Router } from '@angular/router';
// import User from 'src/app/model/entities/User';
// import { AuthService } from 'src/app/model/services/auth.service';
// import { UserService } from 'src/app/model/services/user.service';
// import { UserfirebaseService } from 'src/app/model/services/userfirebase.service';

// // @Component({
// //   selector: 'app-account',
// //   templateUrl: './account.page.html',
// //   styleUrls: ['./account.page.scss'],
// // })
// // export class AccountPage implements OnInit {
// //   formLogar: FormGroup;
// //   user: any;

// //   constructor(private router: Router, private auth: AuthService, private userService: UserService) { }
// //   // constructor(private router: Router, private auth: AuthService, private userService: UserService) { 
// //   //   this.formLogar = new FormGroup({ //instancia o formGroup
// //   //     email: new FormControl(''),
// //   //     senha: new FormControl('')
// //   //   });
// //   // }

// //   ngOnInit() {
// //     this.auth.getUserLogged().subscribe(user => {
// //       this.user = user;
// //     });
// //   }
// //   // ngOnInit() {
// //   //   this.user = this.userService.getUser();
// //   //   console.log(this.auth.getUserLogged());
// //   // }

// //   // get errorControl(){
// //   //   return this.formLogar.controls;
// //   // }

// //   logout() {
// //     this.auth.signOut().then((res) => {
// //       this.router.navigate(["signin"]);
// //     })
// //   }

// // }

// @Component({
//   selector: 'app-account',
//   templateUrl: './account.page.html',
//   styleUrls: ['./account.page.scss'],
// })
// export class AccountPage {
//   public lista_Users : User[] = [];
//   user: any;

//   constructor(private router: Router, private auth: AuthService, private userService: UserfirebaseService) {
//     this.user = this.auth.getUserLogged()
//       console.log(this.auth.getUserLogged())
//       this.userService.read(this.user.uid)
//       .subscribe(res => {
//         this.lista_Users = res.map(user =>{
//           return{
//             id: user.payload.doc.id,
//             ... user.payload.doc.data() as any 
//           }as User;
//         })
//       })
//   }

//   // ngOnInit() {
//   //   this.auth.getUserLogged().subscribe(async user => {
//   //     // O getUserLogged retorna o usuário autenticado do Firebase
//   //     if (user) {
//   //       const customUser = this.userService.getUser();
//   //       // Obtenha os dados do UserService que foram setados no cadastro
//   //       await user.reload(); // Forçar a atualização dos dados do usuário
//   //       const updatedUser = user.toJSON();
//   //       const additionalUserData = this.userService.getUser();
//   //       this.user = { ...updatedUser,...user,
//   //         customPhone: customUser.customPhone, ...additionalUserData };
//   //       console.log('User loaded:', this.user);
//   //     }
//   //     console.log('User loaded:', this.user);
//   //   });
//   // }

//   logout() {
//     this.auth.signOut().then(() => {
//       this.router.navigate(["signin"]);
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/model/services/auth.service';
import { UserfirebaseService } from 'src/app/model/services/userfirebase.service';
import User from 'src/app/model/entities/User';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  user: User | undefined;

  constructor(
    private router: Router,
    private auth: AuthService,
    private userService: UserfirebaseService
  ) {}

  ngOnInit() {
    this.auth.getUserLogged().subscribe(user => {
      if (user && user.uid) {
        this.userService.getUser(user.uid).subscribe((userData: User | undefined) => {
          this.user = userData;
          console.log('User loaded:', this.user);
        });
      } else {
        console.error('User UID is undefined');
      }
    });
  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(["signin"]);
    });
  }
}
