import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  order: Array<any> = [];
  adress: string;
  name: string;
  phone: string;

  constructor() { }

  ngOnInit(): void {
  }

  confirmOrder(): void {
    this.order.push(this.adress, this.name, this.phone);
  }

}
