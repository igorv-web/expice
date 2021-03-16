import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IOrder } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private dbOrderPath = '/orders';
  orderRef: AngularFirestoreCollection<IOrder> = null;
  constructor(private db: AngularFirestore, private router: Router) {
    this.orderRef = this.db.collection(this.dbOrderPath);
  }

  addFireCloudOrder(order: IOrder): Promise<DocumentReference<unknown>> {
    return this.orderRef.add({ ...order });
  }
}
