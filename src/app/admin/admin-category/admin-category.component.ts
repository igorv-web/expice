import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { Category } from 'src/app/shared/models/category.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  adminCategories: Array<ICategory> = [];
  catName: string;
  catURLName: string;
  catID: string;
  editStatus: boolean = false;
  isHide: boolean = false;
  NewCatName: string;
  NewCatURLName: string;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(): void {
    this.apiService.getFireCloudCategories().snapshotChanges().pipe(
      map(collection =>
        collection.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.adminCategories = data;
    });
  }

  addCategory(): void {
    const newCat = new Category(this.catName, this.catURLName);
    this.apiService.addFireCloudCategory(newCat)
      .catch(err => console.log(err));
    this.resetForm();
  }

  deleteCategory(category: ICategory): void {
    this.apiService.deleteFireCloudCategory(category.id.toString())
      .catch(err => console.log(err));
  }

  editCategory(id: string, category: ICategory): void {
    this.isHide = true;
    this.editStatus = true;
    this.catID = id;
    this.NewCatName = category.name;
    this.NewCatURLName = category.urlName;
  }

  updateCategory(): void {
    const editCat = new Category(this.NewCatName, this.NewCatURLName);
    this.apiService.updateFireCloudCategory(this.catID, editCat)
      .catch(err => console.log(err));
    this.resetForm();
    this.editStatus = false;
    this.isHide = false;
  }

  private resetForm(): void {
    this.catName = '';
    this.catURLName = '';
  }
}
