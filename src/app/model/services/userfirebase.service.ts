import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import User from '../entities/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserfirebaseService {
  private PATH: string = 'users';

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {}

  // getUser(uid: string): Observable<User | undefined> {
  //   return this.firestore.collection<User>(this.PATH, ref => ref.where('uid', '==', uid))
  //     .valueChanges()
  //     .pipe(
  //       map(users => users.length > 0 ? users[0] : undefined)
  //     );
  // }
  getUser(uid: string): Observable<User | undefined> {
    return this.firestore.collection<User>(this.PATH, ref => ref.where('uid', '==', uid))
      .snapshotChanges()
      .pipe(
        map(actions => {
          const data = actions.map(a => {
            const id = a.payload.doc.id;
            const userData = a.payload.doc.data() as User;
            userData.id = id;
            return userData;
          });
          return data.length > 0 ? data[0] : undefined;
        })
      );
  }
  

  getFavorites(uid: string): Observable<User | undefined> {
    return this.firestore.collection<User>(this.PATH).doc(uid).valueChanges()
      .pipe(
        map(user => user as User)
      );
  }

  addFavorite(userId: string, petshopId: string) {
    const userDoc = this.firestore.collection(this.PATH).doc(userId);
    return userDoc.update({
      favorites: firebase.firestore.FieldValue.arrayUnion(petshopId)
    }).catch(error => {
      console.error("Error updating document: ", error);
      return userDoc.set({
        favorites: [petshopId]
      }, { merge: true });
    });
  }

  removeFavorite(userId: string, petshopId: string) {
    return this.firestore.collection(this.PATH).doc(userId).update({
      favorites: firebase.firestore.FieldValue.arrayRemove(petshopId)
    }).catch(error => {
      console.error("Error updating document: ", error);
    });
  }

  create(user: User) {
    return this.firestore.collection(this.PATH)
      .add({
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        dogType: user.dogType,
        size: user.size,
        behavior: user.behavior,
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
        size: user.size,
        behavior: user.behavior,
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
        size: user.size,
        behavior: user.behavior,
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
        size: user.size,
        behavior: user.behavior,
        senha: user.senha,
        uid: user.uid
      });
  }

  delete(user: User) {
    return this.firestore.collection(this.PATH).doc(user.id).delete();
  }
}
