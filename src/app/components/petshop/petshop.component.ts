import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Petshop from 'src/app/model/entities/Petshop';

@Component({
  selector: 'app-petshop',
  templateUrl: './petshop.component.html',
  styleUrls: ['./petshop.component.scss'],
})
export class PetshopComponent  implements OnInit {
  @Input() petshop: Petshop;

  constructor(private router : Router) { }

  ngOnInit() {}

  editar(petshop: Petshop){
    this.router.navigateByUrl("/details", {state : {petshop:petshop}});//passa o objeto inteiro, n mais só o parametro
    //console.log(index);
  }

}
