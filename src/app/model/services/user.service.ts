import { Injectable } from '@angular/core';
import User from '../entities/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public lista_Users : User[] = [];

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

  cadastrar(User: User){
    this.lista_Users.push(User);
  }

  obterTodos() : User[]{
    return this.lista_Users;
  }

  obterPorIndice(indice : number) : User{
    //pega o indice do vetor
    return this.lista_Users[indice];
  }

  editar(indice:number, User: User){
    this.lista_Users[indice] = User;
  }

  excluir(indice: number){
    this.lista_Users.splice(indice, 1); //retira os elementos do vetor daquele indice / tira o vetor da lista, sem precisar linkar o anterior com o proximo
  }

  private user: any;

  setUser(user: any) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  updateUser(user: any) {
    this.user = { ...this.user, ...user };
  }
}
