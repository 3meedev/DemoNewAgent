import { Component, OnInit } from '@angular/core';
import { StoreService } from "src/app/service/store.service";
import { store } from 'src/Models/stroe';
import { product } from 'src/Models/product';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { filter } from 'minimatch';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.page.html',
  styleUrls: ['./add-store.page.scss'],
})
export class AddStorePage implements OnInit {
  // store
  dataStore: FormGroup;
  submit: boolean = false;
  dataSt: store;

  // product
  dataProduct: FormGroup;
  dataPd: product[] = [];
  getDataProduct: any;
  dataProductAll: product;
  nameproduct: string;
  dataIdProduct: any
  datacostProduct: any;
  // num: number = 9;

  public dataStoreAll: store;
  // isShowBtn:boolean=true;
  isShowValidate: boolean = false;
  isShowValidateTotal: boolean = false;
  isShowCloseTab: boolean = true;
  isShowOpenTab: boolean = true;

  constructor(private menu: MenuController, public alertController: AlertController, public storeApi: StoreService, public route: Router, public navCtrl: NavController, public formbuilder: FormBuilder, public productApi: ProductService, public activate: ActivatedRoute) {
    this.dataStore = this.formbuilder.group({
      // 'idStore': [null, Validators.required],
      'idProduct': [null, Validators.required],
      'nameProduct': [null, Validators.required],
      // 'unitProduct': [null, Validators.required],
      'totalProduct': [null, Validators.compose([Validators.pattern('[0-9]*'), Validators.required])],
      'costProduct': [null],
      // 'addProductStore': [null, Validators.required]
    });
    // this.productApi.GetProductByid(this.getDataProduct).subscribe(it => {
    //   console.log(it);
    //   this.getDataProduct =it;
    //   console.log(this.getDataProduct);
    // });
  }

  async ConfirmLogout() {
    const alert = await this.alertController.create({
      message: 'ต้องการออกจากระบบหรือไม่ ? ',
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            this.route.navigate(['/login'])
          }
        }, {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
  }

  closeTab() {
    this.menu.enable(false);
    this.isShowOpenTab = false;
    this.isShowCloseTab = false;
  }
  openTab() {
    this.menu.enable(true);
    this.isShowOpenTab = true;
    this.isShowCloseTab = true;
  }

  // ---------------------------------------------------------------------------- Validate

  public errorMessages = {
    totalProduct: [
      { type: 'required', message: 'กรุณากรอกจำนวนสินค้า' },
      { type: 'pattern', message: 'กรุณากรอกจำนวนสินค้าให้ถูกต้อง 0-9' }
    ],
    nameProduct: [
      { type: 'required', message: 'กรุณาเลือกสินค้าสินค้า' }
    ]
  };
  get nameProduct() {
    return this.dataStore.get("nameProduct");
  }
  get totalProduct() {
    return this.dataStore.get("totalProduct");
  }
  check() {
    if (this.dataStore.value.nameProduct == null && this.dataStore.value.totalProduct == null && this.dataStore.value.idProduct == null) {
      this.isShowValidate = true;
    }
    else if (this.dataStore.value.nameProduct != null && this.dataStore.value.totalProduct == null && this.dataStore.value.idProduct == null) {
      this.isShowValidate = true;
    }
    else if (this.dataStore.value.nameProduct == null && this.dataStore.value.totalProduct != null && this.dataStore.value.idProduct == null) {
      this.isShowValidate = true;
    }
    else if (this.dataStore.value.nameProduct != null && this.dataStore.value.totalProduct != null && this.dataStore.value.idProduct == null) {
      this.isShowValidate = false;
      this.ConfirmInsert();
    }
  }


  // -------------------------------------------------------------------------------------- Getshow

  ngOnInit() {

    this.productApi.GetProductAll().subscribe((it) => {
      console.log(it);
      this.dataProductAll = it;
      for (let index = 0; index < Object.keys(this.dataProductAll).length; index++) {
        this.dataPd[index] = this.dataProductAll[index];

      }
      console.log(this.dataPd);
      console.log(this.dataProductAll);
    });
    // if (this.dataStore.value.nameProduct != "" && this.dataStore.value.totalProduct != "") {
    //   this.isShowBtn = true;
    // }else{
    //   this.isShowBtn = false;
    // }
  }

  data(data) {
    console.log(data);
    this.productApi.GetProductByid(data).subscribe(it => {
      console.log(it);
      this.datacostProduct = it.costProduct
      console.log(this.datacostProduct);

    })
  }

  get f() { return this.dataStore.controls; }

  // async log() {
  //   this.submit = true;
  //   console.log(this.dataStore.value);
  //   console.log(this.dataStore);
  //   this.dataSt = this.dataStore.value;
  //   this.storeApi.AddStore(this.dataSt).subscribe(it => {
  //     console.log(it);
  //   });
  // }

  // ------------------------------------------------------------------ Insert

  async ConfirmInsert() {
    const alert = await this.alertController.create({
      message: 'ต้องการที่จะเพิ่มสินค้าหรือไม่ ?',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {


          text: 'ตกลง',
          handler: () => {
            this.insert();
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  insert() {
    var data = this.dataPd.filter(it => it.idProduct == this.dataStore.value.nameProduct);
    console.log(data[0]);
    this.dataStore.value.idProduct = data[0].idProduct;
    this.dataStore.value.nameProduct = data[0].nameProduct;
    console.log(this.dataStore.value);
    this.dataStore.value.costProduct = this.dataStore.value.totalProduct * this.datacostProduct
    this.storeApi.AddStore(this.dataStore.value).subscribe(it => {
      console.log(it);

    });
    console.log(this.dataStore);
    this.productApi.EditAddTotalProduct(this.dataStore.value.idProduct, this.dataStore.value).subscribe(it => {
    });

    this.route.navigate(['/clear-store']);
  }


}


