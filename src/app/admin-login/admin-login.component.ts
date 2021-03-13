import { Component, OnInit } from '@angular/core';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  adminEmail: string;
  adminPassword: string;

  constructor(private auth: AdminService) { }

  ngOnInit(): void {
  }

  adminLogIn(): void {
    this.auth.signIn(this.adminEmail, this.adminPassword);
    this.reset();
  }

  reset(): void {
    this.adminEmail = '';
    this.adminPassword = '';
  }
}

