// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import Petshop from 'src/app/model/entities/Petshop';
// import { AuthService } from 'src/app/model/services/auth.service';
// import { FirebaseService } from 'src/app/model/services/firebase.service';

// @Component({
//   selector: 'app-favorites',
//   templateUrl: './favorites.page.html',
//   styleUrls: ['./favorites.page.scss'],
// })
// export class FavoritesPage implements OnInit {
//   lista_Petshops: Petshop[] = [];
//   isLoading: boolean = false;
//   hasSearched: boolean = false;
//   public user: any; 
  
//   constructor(private firebase: FirebaseService, private router: Router, private auth: AuthService) {
//     this.isLoading = true;
//     this.hasSearched = false;
//     this.user = this.auth.getUserLogged();

//     this.firebase.read(this.user).subscribe(res => {
//       this.lista_Petshops = res.map(petshop => ({ //mapea todos os livros pega id e puxa os dados
//         id: petshop.payload.doc.id,
//         ...petshop.payload.doc.data() as any
//       } as Petshop));
//       this.isLoading = false;
//     });
//   }

//   GoToDetails(petshop: Petshop){
//     this.router.navigateByUrl("/details", { state: { petshop: petshop } });
//   }

//   ngOnInit() {
//     this.isLoading = true;
//     setTimeout(() => {
//       // Colocar lista de livros
//       this.lista_Petshops;
//       this.isLoading = false;
//     }, 3000); //  delay de 3 milissegundos
//   }

// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Petshop from 'src/app/model/entities/Petshop';
import { AuthService } from 'src/app/model/services/auth.service';
import { UserfirebaseService } from 'src/app/model/services/userfirebase.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import User from 'src/app/model/entities/User';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  user: User | null = null;
  favorites: string[] = [];
  favoritePetshops: Petshop[] = [];

  constructor(
    private router: Router,
    private auth: AuthService,
    private userService: UserfirebaseService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.auth.getUserLogged().subscribe(user => {
      if (user) {
        this.user = user as User; // Cast to User type
        this.userService.getFavorites(user.uid).subscribe((userData: User | undefined) => {
          if (userData) {
            this.favorites = userData.favorites || [];
            this.loadFavoritePetshops();
          }
        });
      }
    });
  }

  loadFavoritePetshops() {
    this.favoritePetshops = [];
    this.favorites.forEach(petshopId => {
      this.firebaseService.getPetshop(petshopId).subscribe((petshop: Petshop | undefined) => {
        if (petshop) {
          this.favoritePetshops.push(petshop);
        }
      });
    });
  }

  viewDetails(petshop: Petshop) {
    this.router.navigateByUrl('/details', { state: { petshop: petshop } });
  }
}
