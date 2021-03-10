import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  isAdmin = new Subject<boolean>();

  constructor(private auth: AngularFireAuth, private router: Router) { }

  signIn(email: string, password: string): void {
    this.auth.signInWithEmailAndPassword(email, password)
    .then(userResponse => {
      // localStorage.setItem('uid', JSON.stringify());
      this.isAdmin.next(true);
      this.router.navigateByUrl('/admin/admin-product');
    })
    .catch(err => console.log(err)
    )
  }

  signOutAdmin(): void {
    this.auth.signOut();
    localStorage.removeItem('uid');
    this.isAdmin.next(false);
    this.router.navigateByUrl('/reg');
  }
}
