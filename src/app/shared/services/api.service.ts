import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import { ICategory } from '../interfaces/category.interface';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private dbCategoryPath = '/categories';
  private dbProductPath = '/products';
  categoriesRef: AngularFirestoreCollection<ICategory> = null;
  productsRef: AngularFirestoreCollection<IProduct> = null;

  constructor(private db: AngularFirestore) {
    this.categoriesRef = this.db.collection(this.dbCategoryPath);
    this.productsRef = this.db.collection(this.dbProductPath);
  }

  getFireCloudCategories(): AngularFirestoreCollection<ICategory> {
    return this.categoriesRef;
  }

  addFireCloudCategory(category: ICategory): Promise<DocumentReference<unknown>> {
    return this.categoriesRef.add({...category});
  }

  updateFireCloudCategory(id: string, category: ICategory): Promise<void> {
    return this.categoriesRef.doc(id).update({...category});
  }

  deleteFireCloudCategory(id: string): Promise<void> {
    return this.categoriesRef.doc(id).delete();
  }

  getFireCloudProducts(): AngularFirestoreCollection<IProduct> {
    return this.productsRef;
  }

  addFireCloudProduct(product: IProduct): Promise<DocumentReference<unknown>> {
    return this.productsRef.add({...product});
  }

  updateFireCloudProduct(id: string, product: IProduct): Promise<void> {
    return this.productsRef.doc(id).update({...product});
  }

  deleteFireCloudProduct(id: string): Promise<void> {
    return this.productsRef.doc(id).delete();
  }

  getFireCloudCategoryProducts(category: string): any {
    return this.productsRef.ref.where('category.urlName', '==', category);
  }

  getFireCloudOneProduct(name: string): any {
    return this.productsRef.ref.where('urlName', '==', name);
  }
}
