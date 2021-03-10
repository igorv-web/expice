import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLogin: boolean;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin(): void {
    this.auth.userStatus.subscribe((data) => {
      this.isLogin = data;
    });
  }
}
