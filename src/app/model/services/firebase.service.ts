import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import Petshop from '../entities/Petshop';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH: string ='petshop';

  constructor(private firestore : AngularFirestore, private storage : AngularFireStorage) { }

  read(uid : string){
    return this.firestore.collection(this.PATH).snapshotChanges();//,
      //ref => ref.where('uid', '==', uid))// ref => referencia // where => select no banco, buscando o uid
      // poderia ter mais um ref com o nome de alguem no lugar do segundo uid => para buscas especificas
    //.snapshotChanges();
  }

  create(petshop: Petshop){
    return this.firestore.collection(this.PATH)
    .add({name: petshop.name, dogType: petshop.dogType, address: petshop.address, contact: petshop.contact,
        openingHours: petshop.openingHours, hourEnding: petshop.hourEnding, rating: petshop.rating,
        price: petshop.price/*, uid: petshop.uid*/});

  }

  createWithAvatar(petshop: Petshop){
    return this.firestore.collection(this.PATH)
    .add({name: petshop.name, dogType: petshop.dogType, address: petshop.address, contact: petshop.contact,
        openingHours: petshop.openingHours, hourEnding: petshop.hourEnding, rating: petshop.rating,
        price: petshop.price, downloadURL : petshop.downloadURL/*, uid: petshop.uid*/});
  }

  updateWithAvatar(petshop: Petshop, id: string){
    return this.firestore.collection(this.PATH).doc(id)
    .update({name: petshop.name, dogType: petshop.dogType, address: petshop.address, contact: petshop.contact,
        openingHours: petshop.openingHours, hourEnding: petshop.hourEnding, rating: petshop.rating,
        price: petshop.price, downloadURL : petshop.downloadURL/*, uid: petshop.uid*/});
  }

  uploadImage(imagem: any, petshop: Petshop){
    const file = imagem.item(0);
    if(file.type.split('/')[0] != 'image'){ //split => separa a imagem em varios arrays
      console.error('Tipo não Suportado!'); //garante q sera enviado apenas imagens
      return;
    }

    const path =`images/${petshop.name}_${file.name}`; // caminho da imagem
    const fileRef = this.storage.ref(path); // pega a referencia da imagem
    let task = this.storage.upload(path,file); // tarefa q armazena o envio da imagem
    task.snapshotChanges().pipe(
      finalize(() =>{
        let uploadFileURL = fileRef.getDownloadURL(); //n garante a resposta
        uploadFileURL.subscribe(resp => { //subscribe => quebra o retorno 'resp'
          petshop.downloadURL = resp; // pega a resposta e armazanea naquele petshop
          if(!petshop.id){ // se o petshop n existe
            this.createWithAvatar(petshop); // cria o petshop 
          }else{
            this.updateWithAvatar(petshop, petshop.id);
          }
        })
      })
      ).subscribe(); //envia a imagem pro banco

  }

  update(petshop: Petshop,id: string){
    return this.firestore.collection(this.PATH).doc(id)
    .update({name: petshop.name, dogType: petshop.dogType, address: petshop.address, contact: petshop.contact,
        openingHours: petshop.openingHours, hourEnding: petshop.hourEnding, rating: petshop.rating,
        price: petshop.price/*, uid: petshop.uid*/});
  }

  delete(petshop: Petshop){
    return this.firestore.collection(this.PATH)
    .doc(petshop.id).delete()
  }
}
