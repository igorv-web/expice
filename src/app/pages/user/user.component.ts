import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: any;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  signOutUser(): void {
    this.auth.signOutAC();
  }

  private getUserInfo(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

}
