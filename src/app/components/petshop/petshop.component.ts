import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Petshop from 'src/app/model/entities/Petshop';
import { UserfirebaseService } from 'src/app/model/services/userfirebase.service';

@Component({
  selector: 'app-petshop',
  templateUrl: './petshop.component.html',
  styleUrls: ['./petshop.component.scss'],
})
export class PetshopComponent  implements OnInit {
  @Input() petshop: Petshop;
  petshops = []; // Sua lista de petshops
  user: any;
  favorites: string[] = [];

  constructor(private router : Router,private userService: UserfirebaseService) { }

  ngOnInit() {}

  editar(petshop: Petshop){
    this.router.navigateByUrl("/details", {state : {petshop:petshop}});//passa o objeto inteiro, n mais só o parametro
    //console.log(index);
  }

  toggleFavorite(petshopId: string) {
    if (this.isFavorite(petshopId)) {
      this.userService.removeFavorite(this.user.uid, petshopId);
    } else {
      this.userService.addFavorite(this.user.uid, petshopId);
    }
  }

  isFavorite(petshopId: string): boolean {
    return this.favorites.includes(petshopId);
  }
}
