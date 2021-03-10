import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userStatus = new Subject<boolean>();

  constructor(private auth: AngularFireAuth, private db: AngularFirestore, private router: Router) { }

  signIn(email: string, password: string): void {
    this.auth.signInWithEmailAndPassword(email, password)
    .then(userResponse => {
      this.db.collection('users').ref.where('uid', '==', userResponse.user.uid)
      .onSnapshot(snap => {
        snap.forEach(user => {
          const USER = {
            id: user.id,
            ...user.data() as IUser
          }
          localStorage.setItem('user', JSON.stringify(USER));
          this.userStatus.next(true);
          this.router.navigateByUrl('/user');
        })
      })
    })
    .catch(err => console.log(err)
    )
  }

  singUp(email: string, password: string): void {
    this.auth.createUserWithEmailAndPassword(email, password)
    .then(userResponse => {
      const NEW_USER = new User(userResponse.user.uid, userResponse.user.email);
      this.db.collection('users').add({...NEW_USER})
      .then( collection => {
        collection.get().then(userCredential => {
          this.userStatus.next(true);
          this.router.navigateByUrl('/user');
          const id = userCredential.id;
          const data = userCredential.data();
          const localUser = { id, ...data as IUser }
          localStorage.setItem('user', JSON.stringify(localUser))
        });
      }
      )
      .catch(err => console.log(err)
      )
    })
  }

  signOutAC(): void {
    this.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigateByUrl('/reg');
  }
}
