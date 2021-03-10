import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLogin: boolean;

  constructor() {}

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin(): void {
    if (localStorage.getItem('user')) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
}
