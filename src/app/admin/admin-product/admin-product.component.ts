import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
})
export class AdminProductComponent implements OnInit {
  adminCategories: Array<ICategory> = [];
  adminProducts: Array<IProduct> = [];
  currentCategory: ICategory;
  prodName: string;
  prodURLName: string;
  prodPrice: number;
  prodImage: string;
  upload: any;
  uploadStatus: boolean;
  editStatus: boolean = false;
  isHide: boolean = false;
  NewProdName: string;
  NewProdURLName: string;
  NewProdPrice: number;
  prodID: string;

  constructor(
    private afStorage: AngularFireStorage,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  private getCategories(): void {
    this.apiService
      .getFireCloudCategories()
      .snapshotChanges()
      .pipe(
        map((collection) =>
          collection.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        this.adminCategories = data;
      });
  }

  private getProducts(): void {
    this.apiService
      .getFireCloudProducts()
      .snapshotChanges()
      .pipe(
        map((collection) =>
          collection.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        this.adminProducts = data;
      });
  }

  addProduct(): void {
    const PROD = new Product(
      this.prodName,
      this.prodURLName,
      this.currentCategory,
      this.prodPrice,
      this.prodImage
    );
    this.apiService.addFireCloudProduct(PROD).catch((err) => console.log(err));
    this.resetForm();
    this.uploadStatus = false;
  }

  deleteProduct(product: IProduct): void {
    this.apiService
      .deleteFireCloudProduct(product.id.toString())
      .catch((err) => console.log(err));
  }

  uploadFile(event): void {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    this.upload = this.afStorage.upload(filePath, file);
    this.upload.then((image) => {
      this.afStorage
        .ref(`images/${image.metadata.name}`)
        .getDownloadURL()
        .subscribe((url) => {
          this.prodImage = url;
          this.uploadStatus = true;
          event.target.files = null;
        });
    });
  }

  deleteImage(): void {
    this.afStorage.storage
      .refFromURL(this.prodImage)
      .delete()
      .then(() => {
        this.uploadStatus = false;
      })
      .catch((err) => console.log(err));
  }

  editProduct(id: string, product: IProduct): void {
    this.isHide = true;
    this.editStatus = true;
    this.NewProdName = product.name;
    this.NewProdURLName = product.urlName;
    this.currentCategory = product.category;
    this.NewProdPrice = product.price;
    this.prodImage = product.img;
    this.prodID = id;
  }

  updateProduct(): void {
    const NEW_PRODUCT = new Product(
      this.NewProdName,
      this.NewProdURLName,
      this.currentCategory,
      this.NewProdPrice,
      this.prodImage
    );
    this.apiService
      .updateFireCloudProduct(this.prodID, NEW_PRODUCT)
      .catch((err) => console.log(err));
    this.resetForm();
    this.editStatus = false;
    this.isHide = false;
  }

  private resetForm(): void {
    this.prodName = '';
    this.prodURLName = '';
    this.prodPrice = 0;
    this.prodImage = '';
  }
}
