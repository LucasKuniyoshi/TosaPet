import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import Petshop from 'src/app/model/entities/Petshop';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('mySearchbar') searchbar: IonSearchbar;
  lista_Petshops: Petshop[] = [];
  public user: any; 
  isLoading: boolean = false;
  hasSearched: boolean = false;
  query: any;
  model: any = {
    icon: 'ban-outline',
    title: 'Nada por aqui.. :('
  };
  constructor(private firebase: FirebaseService, private router: Router, private auth: AuthService) {
    this.isLoading = true;
    this.hasSearched = false;
    this.user = this.auth.getUserLogged();

    this.firebase.read(this.user).subscribe(res => {
      this.lista_Petshops = res.map(petshop => ({ //mapea todos os petshops pega id e puxa os dados
        id: petshop.payload.doc.id,
        ...petshop.payload.doc.data() as any
      } as Petshop));
      this.isLoading = false;
    });
  }

  GoToAccount(){
    this.router.navigate(['/account']);
  }

  GoToDetails(petshop: Petshop){
    this.router.navigateByUrl("/details", { state: { petshop: petshop } });
  }

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      // Colocar lista de petshops
      this.lista_Petshops;
      this.isLoading = false;
    }, 3000); //  delay de 3 milissegundos
  }

  // filtrar petshops
  PetshopFilter(event: any) {
    this.isLoading = true;
    const query = event.detail.value;
  
    if (query) {
      console.log('Busca:', query);
      this.firebase.read(this.user).subscribe(res => {
        this.lista_Petshops = res.map(petshop => ({
          id: petshop.payload.doc.id,
          ...petshop.payload.doc.data() as any
        } as Petshop)).filter(petshop =>
          petshop.name.toLowerCase().includes(query.toLowerCase()) //nome do petshop minusculo e ver se tem nome
        );
        console.log('Petshops encontrados:', this.lista_Petshops);
        this.isLoading = false;
      });
    } else {
      // se campo de busca estiver vazio recarrega todos os petshops
      this.firebase.read(this.user).subscribe(res => {
        this.lista_Petshops = res.map(petshop => ({
          id: petshop.payload.doc.id,
          ...petshop.payload.doc.data() as any
        } as Petshop));
        console.log('Petshops encontrados (sem busca):', this.lista_Petshops);
        this.isLoading = false;
      });
    }
  }

  //  chamado quando a busca é alterada
  onSearchChange(event: any) {
    this.hasSearched = true;
    this.query = event.detail.value.toLowerCase();
    if (this.query.length > 0) {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    }
  }

  //  chamado quando o usuário deseja voltar da busca
  returnSearch() {
    this.hasSearched = false;
    this.searchbar.value = null;
  }
}
