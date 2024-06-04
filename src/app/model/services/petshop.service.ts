import { Injectable } from '@angular/core';
import Petshop from '../entities/Petshop';

@Injectable({
  providedIn: 'root'
})
export class PetshopService {
  public lista_Petshops : Petshop[] = [];

  constructor() { 
    /*let c1 : Contato = new Contato("Carlos Eduardo", 910728123);
    let c2 : Contato = new Contato("Jotair", 909828123, "vsjsasa@gmail.com");
    let c3 : Contato = new Contato("Giovanne Galvão", 912348123, "vsjfggfda@gmail.com");
    let c4 : Contato = new Contato("Josiel", 910735223, "ja@gmail.com");
    this.lista_contatos.push(c1);
    this.lista_contatos.push(c2);
    this.lista_contatos.push(c3);
    this.lista_contatos.push(c4);*/
  }

  cadastrar(Petshop: Petshop){
    this.lista_Petshops.push(Petshop);
  }

  obterTodos() : Petshop[]{
    return this.lista_Petshops;
  }

  obterPorIndice(indice : number) : Petshop{
    //pega o indice do vetor
    return this.lista_Petshops[indice];
  }

  editar(indice:number, Petshop: Petshop){
    this.lista_Petshops[indice] = Petshop;
  }

  excluir(indice: number){
    this.lista_Petshops.splice(indice, 1); //retira os elementos do vetor daquele indice / tira o vetor da lista, sem precisar linkar o anterior com o proximo
  }
}
