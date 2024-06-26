// import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { finalize } from 'rxjs/operators';
// import { AngularFireStorage } from '@angular/fire/compat/storage';
// import User from '../entities/User';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserfirebaseService {
//   private PATH: string ='user';

//   constructor(private firestore : AngularFirestore, private storage : AngularFireStorage) { }

//   read(uid : string){
//     return this.firestore.collection(this.PATH,
//       ref => ref.where('uid', '==', uid))// ref => referencia // where => select no banco, buscando o uid
//       // poderia ter mais um ref com o nome de alguem no lugar do segundo uid => para buscas especificas
//     .snapshotChanges();
//   }

//   create(user: User){
//     return this.firestore.collection(this.PATH)
//     .add({userName: user.userName, email: user.email, phone: user.phone, senha: user.senha, dogType: user.dogType, uid: user.uid});

//   }

//   createWithAvatar(user: User){
//     return this.firestore.collection(this.PATH)
//     .add({userName: user.userName, email: user.email, phone: user.phone, senha: user.senha, dogType: user.dogType, downloadURL : user.downloadURL, uid: user.uid});
//   }

//   updateWithAvatar(user: User, id: string){
//     return this.firestore.collection(this.PATH).doc(id)
//     .update({userName: user.userName, email: user.email, phone: user.phone, senha: user.senha, dogType: user.dogType, downloadURL : user.downloadURL, uid: user.uid});
//   }

//   uploadImage(imagem: any, user: User){
//     const file = imagem.item(0);
//     if(file.type.split('/')[0] != 'image'){ //split => separa a imagem em varios arrays
//       console.error('Tipo não Suportado!'); //garante q sera enviado apenas imagens
//       return;
//     }

//     const path =`images/${user.userName}_${file.userName}`; // caminho da imagem
//     const fileRef = this.storage.ref(path); // pega a referencia da imagem
//     let task = this.storage.upload(path,file); // tarefa q armazena o envio da imagem
//     task.snapshotChanges().pipe(
//       finalize(() =>{
//         let uploadFileURL = fileRef.getDownloadURL(); //n garante a resposta
//         uploadFileURL.subscribe(resp => { //subscribe => quebra o retorno 'resp'
//           user.downloadURL = resp; // pega a resposta e armazanea naquele livro
//           if(!user.id){ // se o user n existe
//             this.createWithAvatar(user); // cria o user 
//           }else{
//             this.updateWithAvatar(user, user.id);
//           }
//         })
//       })
//       ).subscribe(); //envia a imagem pro banco

//   }

//   update(user: User,id: string){
//     return this.firestore.collection(this.PATH).doc(id)
//     .update({userName: user.userName, email: user.email, phone: user.phone, senha: user.senha, dogType: user.dogType, uid: user.uid});
//   }

//   delete(user: User){
//     return this.firestore.collection(this.PATH)
//     .doc(user.id).delete()
//   }
// }
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import User from '../entities/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserfirebaseService {
  private PATH: string = 'users';

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {}

  read(uid: string): Observable<User[]> {
    return this.firestore.collection<User>(this.PATH, ref => ref.where('uid', '==', uid))
      .valueChanges() as Observable<User[]>;
  }

  create(user: User) {
    return this.firestore.collection(this.PATH)
      .add({
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        dogType: user.dogType,
        senha: user.senha,
        uid: user.uid
      });
  }

  createWithAvatar(user: User) {
    return this.firestore.collection(this.PATH)
      .add({
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        dogType: user.dogType,
        senha: user.senha,
        downloadURL: user.downloadURL,
        uid: user.uid
      });
  }

  updateWithAvatar(user: User, id: string) {
    return this.firestore.collection(this.PATH).doc(id)
      .update({
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        dogType: user.dogType,
        senha: user.senha,
        downloadURL: user.downloadURL,
        uid: user.uid
      });
  }

  uploadImage(imagem: any, user: User) {
    const file = imagem.item(0);
    if (file.type.split('/')[0] !== 'image') {
      console.error('Tipo não Suportado!');
      return;
    }

    const path = `images/${user.userName}_${file.name}`;
    const fileRef = this.storage.ref(path);
    let task = this.storage.upload(path, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        let uploadFileURL = fileRef.getDownloadURL();
        uploadFileURL.subscribe(resp => {
          user.downloadURL = resp;
          if (!user.id) {
            this.createWithAvatar(user);
          } else {
            this.updateWithAvatar(user, user.id);
          }
        });
      })
    ).subscribe();
  }

  update(user: User, id: string) {
    return this.firestore.collection(this.PATH).doc(id)
      .update({
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        dogType: user.dogType,
        senha: user.senha,
        uid: user.uid
      });
  }

  delete(user: User) {
    return this.firestore.collection(this.PATH).doc(user.id).delete();
  }

  getUser(uid: string): Observable<User | undefined> {
    return this.firestore.collection<User>(this.PATH, ref => ref.where('uid', '==', uid))
      .valueChanges()
      .pipe(
        map(users => users.length > 0 ? users[0] : undefined)
      );
  }
}
