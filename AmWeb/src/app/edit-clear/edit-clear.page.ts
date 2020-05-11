import { Component, OnInit } from '@angular/core';
import { product } from 'src/Models/Product';
import { ProductService } from "src/app/service/Product.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { store } from 'src/Models/stroe';
import { StoreService } from 'src/app/service/store.service';
@Component({
  selector: 'app-edit-clear',
  templateUrl: './edit-clear.page.html',
  styleUrls: ['./edit-clear.page.scss'],
})
export class EditClearPage implements OnInit {

  dataproduct: product;
  dataClear: FormGroup;
  dataPd: product[] = [];
  id: any;
  name: any;
  clear:any;
  datapro: store;
  dataProductMd: store;
  constructor(public activate: ActivatedRoute,public productapi: ProductService, public formbuilder: FormBuilder,public route: Router,public storeApi:StoreService) {
    this.clear = this.activate.snapshot.paramMap.get('_id');
    this.dataClear = this.formbuilder.group({
      'idProduct': [null, Validators.required],
      'nameProduct': [null, Validators.required],
      'statusProduct': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.productapi.GetProductAll().subscribe((it) => {
      console.log(it);
      this.dataproduct = it;
      for (let index = 0; index < Object.keys(this.dataproduct).length; index++) {
        this.dataPd[index] = this.dataproduct[index];

      }
      console.log(this.dataPd);
      console.log(this.dataproduct);
      this.id = this.dataClear.value.idProduct;
      this.name = this.dataClear.value.nameProduct;
    });
    this.get()
  }
  get() {    
    this.productapi.GetProductByid(this.clear).subscribe((item) => {
      console.log(item);
      this.dataClear.patchValue(item)
      console.log(this.dataClear.value);
      console.log(this.dataClear.value.idProduct);
      console.log(this.dataClear.value.nameProduct);
      this.id = this.dataClear.value.idProduct;
      this.name = this.dataClear.value.nameProduct;
    });
  }
   log() {
    console.log(this.dataClear.value);
    this.datapro = this.dataClear.value
    console.log(this.datapro);   

    this.productapi.EditDataProduct(this.clear,this.datapro).subscribe(it => {
      console.log(it);

      this.route.navigate(['/clear-store']);

    });

  }

  
}
