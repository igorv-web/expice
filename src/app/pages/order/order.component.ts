import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/models/order.model';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  order: Array<any> = [localStorage.getItem('basket')];
  orderAdress: string;
  orderName: string;
  orderPhone: string;
  payment: string;

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
  }

  confirmOrder(): void {
    const ORD = new Order(
      this.order,
      this.orderAdress,
      this.orderName,
      this.orderPhone,
      this.payment
    );
    
    this.orderService.addFireCloudOrder(ORD).catch((err) => console.log(err));
    localStorage.removeItem('basket');
    this.resetForm();
    this.router.navigateByUrl('/home');
  }

  private resetForm(): void {
    this.orderAdress = '';
    this.orderName = '';
    this.orderPhone = '';
  }

}
