import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  haveAc: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  have(): void {
    this.haveAc = !this.haveAc;
  }

}
