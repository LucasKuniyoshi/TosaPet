import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Petshop from 'src/app/model/entities/Petshop';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  lista_Petshops: Petshop[] = [];
  isLoading: boolean = false;
  hasSearched: boolean = false;
  public user: any; 
  
  constructor(private firebase: FirebaseService, private router: Router, private auth: AuthService) {
    this.isLoading = true;
    this.hasSearched = false;
    this.user = this.auth.getUserLogged();

    this.firebase.read(this.user).subscribe(res => {
      this.lista_Petshops = res.map(petshop => ({ //mapea todos os livros pega id e puxa os dados
        id: petshop.payload.doc.id,
        ...petshop.payload.doc.data() as any
      } as Petshop));
      this.isLoading = false;
    });
  }

  GoToDetails(petshop: Petshop){
    this.router.navigateByUrl("/details", { state: { petshop: petshop } });
  }

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      // Colocar lista de livros
      this.lista_Petshops;
      this.isLoading = false;
    }, 3000); //  delay de 3 milissegundos
  }

}
