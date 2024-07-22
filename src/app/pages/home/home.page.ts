import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import Petshop from 'src/app/model/entities/Petshop';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { Geolocation } from '@capacitor/geolocation';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
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
  center: google.maps.LatLngLiteral;
  zoom: number = 15;
  apiLoaded: Promise<boolean>;

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
    this.apiLoaded = this.loadGoogleMapsApi();
    this.getCurrentLocation();
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

  async getCurrentLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.center = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude,
    };
  }

  loadGoogleMapsApi(): Promise<boolean> {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;
      script.onload = () => resolve(true);
      document.head.appendChild(script);
    });
  }
  // loadGoogleMapsApi(): Promise<boolean> {
  //   return new Promise((resolve) => {
  //     const script = document.createElement('script');
  //     script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&map_ids=bb7639cf3431cb48`;
  //     script.onload = () => resolve(true);
  //     document.head.appendChild(script);
  //   });
  // }

  addMarker(position: google.maps.LatLngLiteral) {
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: position,
      zoom: this.zoom,
      mapId: 'bb7639cf3431cb48' // Adicionando o ID do mapa personalizado
    });

    new google.maps.Marker({
      position: position,
      map: map,
    });
  }
}
