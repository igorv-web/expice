import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  haveAc: boolean = false;
  userEmail: string;
  userPassword: string;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  logIn(): void {
    this.auth.signIn(this.userEmail, this.userPassword);
    this.reset();
  }

  signUp(): void {
    this.auth.singUp(this.userEmail, this.userPassword);
    this.reset();
  }

  have(): void {
    this.haveAc = !this.haveAc;
  }

  reset(): void {
    this.userEmail = '';
    this.userPassword = '';
  }
}
