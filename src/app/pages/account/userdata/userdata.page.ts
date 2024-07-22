// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import User from 'src/app/model/entities/User';
// import { AuthService } from 'src/app/model/services/auth.service';
// import { UserfirebaseService } from 'src/app/model/services/userfirebase.service';

// @Component({
//   selector: 'app-userdata',
//   templateUrl: './userdata.page.html',
//   styleUrls: ['./userdata.page.scss'],
// })
// export class UserdataPage implements OnInit {
//   user: User | undefined;

//   constructor(
//     private router: Router,
//     private auth: AuthService,
//     private userService: UserfirebaseService
//   ) {}

//   ngOnInit() {
//     this.auth.getUserLogged().subscribe(user => {
//       if (user && user.uid) {
//         this.userService.getUser(user.uid).subscribe((userData: User | undefined) => {
//           this.user = userData;
//           console.log('User loaded:', this.user);
//         });
//       } else {
//         console.error('User UID is undefined');
//       }
//     });
//   }

// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/model/entities/User';
import { AuthService } from 'src/app/model/services/auth.service';
import { UserfirebaseService } from 'src/app/model/services/userfirebase.service';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.page.html',
  styleUrls: ['./userdata.page.scss'],
})
export class UserdataPage implements OnInit {
  userrr: User;
  userName: string;
  email: string;
  phone: string;
  dogType: string;
  size: string;
  behavior: string;
  public imagem: any;
  public userr: any;
  user: User | undefined;

  constructor(
    private router: Router,
    private auth: AuthService,
    private userService: UserfirebaseService
  ) {
    this.userr = this.auth.getUserLogged();
  }

  ngOnInit() {
    this.auth.getUserLogged().subscribe(user => {
      if (user && user.uid) {
        this.userService.getUser(user.uid).subscribe((userData: User | undefined) => {
          this.user = userData;
          console.log('User loaded:', this.user);
          this.populateFields();
        });
      } else {
        console.error('User UID is undefined');
      }
    });
  }

  populateFields() {
    if (this.user) {
      this.userName = this.user.userName;
      this.email = this.user.email;
      this.phone = this.user.phone;
      this.dogType = this.user.dogType;
      this.size = this.user.size;
      this.behavior = this.user.behavior;
    }
  }

  uploadFile(imagem: any) {
    this.imagem = imagem.files;
  }

  editar() {
    if (!this.user || !this.userName || !this.phone || !this.dogType || !this.size || !this.behavior) {
      console.error('User data is incomplete.');
      return;
    }

    let novo: User = new User(
      this.userName || this.user.userName,
      this.user.email,
      this.phone || this.user.phone,
      this.dogType || this.user.dogType,
      this.size || this.user.size,
      this.behavior || this.user.behavior,
      this.user.senha
    );
    novo.id = this.user.id;
    novo.uid = this.user.uid;

    if (this.imagem) {
      this.userService.uploadImage(this.imagem, novo);
    } else {
      this.userService.update(novo, this.user.id!).then(() => {
        this.router.navigate(['/account']);
      });
    }
  }
}


