import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  isAdmin = new Subject<boolean>();

  constructor(private authAdmin: AngularFireAuth, private router: Router) { }

  signIn(email: string, password: string): void {
    this.authAdmin.signInWithEmailAndPassword(email, password)
    .then(userResponse => {
      localStorage.setItem('uid', JSON.stringify(userResponse.user.uid));
      this.isAdmin.next(true);
      this.router.navigateByUrl('/admin/admin-product');
    })
    .catch(err => console.log(err)
    )
  }

  signOutAdmin(): void {
    this.authAdmin.signOut();
    localStorage.removeItem('uid');
    this.isAdmin.next(false);
    this.router.navigateByUrl('/admin-login');
  }
}
