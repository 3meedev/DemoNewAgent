import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/app/service/store.service';
import { store } from 'src/Models/stroe';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { product } from 'src/Models/product';
import { ProductService } from '../service/product.service';
@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.page.html',
  styleUrls: ['./edit-store.page.scss'],
})
export class EditStorePage implements OnInit {

  dataStore: FormGroup;
  IdeditStore: any;
  dataProductMd: store;
  submit: boolean = false;
  a; aa;
  unittotal;
  dataProductAll: product;
  dataIdProduct: any;

  constructor(public productApi: ProductService, public activate: ActivatedRoute, public storeApi: StoreService, public formbuilder: FormBuilder, public route: Router) {

    this.IdeditStore = this.activate.snapshot.paramMap.get('_id');
    console.log(this.IdeditStore);
    this.dataStore = this.formbuilder.group({
      'idStore': [null, Validators.required],
      'idProduct': [null, Validators.required],
      'nameProduct': [null, Validators.required],
      'unitProduct': [null, Validators.required],
      'unitTotal': [null, Validators.required]
    });
    this.storeApi.GetProductStoreByid(this.IdeditStore).subscribe((item) => {
      console.log(item);
      this.dataStore.patchValue(item)
      console.log(this.dataStore.value);
      this.a = this.dataStore.value.idProduct;
      this.aa = this.dataStore.value.nameProduct;
      console.log(this.a);
      this.dataStore.value.unitTotal = this.dataStore.value.unitProduct+1;
      console.log(this.dataStore.value.unitTotal);
      
      




    });

  }

  ngOnInit() {
    this.productApi.GetProductAll().subscribe((it) => {
      console.log(it);
      this.dataProductAll = it;
      console.log(this.dataProductAll);
    });
  }

  editlog() {

    this.dataProductMd = this.dataStore.value

    this.storeApi.EditDataStore(this.IdeditStore, this.dataProductMd).subscribe(it => {
      console.log(it);
    });
    this.route.navigate(['/store']);
  }
}
