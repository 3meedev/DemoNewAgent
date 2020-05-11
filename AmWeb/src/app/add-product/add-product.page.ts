import { Component, OnInit } from '@angular/core';
import { ProductService } from "src/app/service/product.service";
import { product } from 'src/Models/product';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  dataProduct: FormGroup;
  submit: boolean = false;
  dataPd: product;
  isShowValidateId: boolean = false;
  isShowValidateName: boolean = false;
  isShowValidateType: boolean = false;
  isShowValidatePrice: boolean = false;
  isShowValidateCost: boolean = false;
  isShowCloseTab: boolean = true;
  isShowOpenTab: boolean = true;
  constructor(private menu: MenuController, public alertController: AlertController, public productApi: ProductService, public route: Router, public navCtrl: NavController, public formbuilder: FormBuilder) {
    this.dataProduct = this.formbuilder.group({
      'idProduct': [null, Validators.required],
      'nameProduct': [null, Validators.required],
      'typeProduct': [null, Validators.required],
      'priceProduct': [null, Validators.compose([Validators.pattern('[0-9]*'), Validators.required])],
      'costProduct': [null, Validators.compose([Validators.pattern('[0-9]*'), Validators.required])]
    });
  }

  get f() { return this.dataProduct.controls; }

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

  ngOnInit() {
  }

  // ------------------------------------------------------------------------------------- Validation

  async Alert() {
    const alert = await this.alertController.create({
      message: 'กรุณากรอกข้อมูลให้ครบถ้วน.',
      buttons: ['ตกลง']
    });

    await alert.present();
  }

  public errorMessages = {
    costProduct: [
      { type: 'pattern', message: 'กรุณากรอกราคาต้นทุนให้ถูกต้อง 0-9' }
    ],
    priceProduct: [
      { type: 'pattern', message: 'กรุณากรอกราคาสินค้าให้ถูกต้อง 0-9' }
    ],
  };
  get priceProduct() {
    return this.dataProduct.get("priceProduct");
  }
  get costProduct() {
    return this.dataProduct.get("costProduct");
  }

  check() {
    if (this.dataProduct.value.nameProduct != null && this.dataProduct.value.idProduct != null && this.dataProduct.value.typeProduct != null
      && this.dataProduct.value.priceProduct != null && this.dataProduct.value.costProduct != null) {
      this.isShowValidateId = false;
      this.isShowValidateName = false;
      this.isShowValidateType = false;
      this.isShowValidatePrice = false;
      this.isShowValidateCost = false;
      this.ConfirmInsert();
    } else if (this.dataProduct.value.nameProduct == null) {
      this.isShowValidateId = false;
      this.isShowValidateName = true;
      this.isShowValidateType = false;
      this.isShowValidatePrice = false;
      this.isShowValidateCost = false;
      this.Alert();
    } else if (this.dataProduct.value.typeProduct == null) {
      this.isShowValidateId = false;
      this.isShowValidateName = false;
      this.isShowValidateType = true;
      this.isShowValidatePrice = false;
      this.isShowValidateCost = false;
      this.Alert();
    } else if (this.dataProduct.value.idProduct == null) {
      this.isShowValidateId = true;
      this.isShowValidateName = false;
      this.isShowValidateType = false;
      this.isShowValidatePrice = false;
      this.isShowValidateCost = false;
      this.Alert();
    } else if (this.dataProduct.value.priceProduct == null) {
      this.isShowValidateId = false;
      this.isShowValidateName = false;
      this.isShowValidateType = false;
      this.isShowValidatePrice = true;
      this.isShowValidateCost = false;
      this.Alert();
    } else if (this.dataProduct.value.costProduct == null) {
      this.isShowValidateId = false;
      this.isShowValidateName = false;
      this.isShowValidateType = false;
      this.isShowValidatePrice = false;
      this.isShowValidateCost = true;
      this.Alert();
    }


  }

  // ------------------------------------------------------------------------------------- Insert

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
        },
        {

          text: 'ตกลง',
          handler: () => {
            this.log();
            console.log('Confirm Okay');
          }


        }
      ]
    });
    await alert.present();
  }

  log() {

    console.log(this.dataProduct.value);
    console.log(this.dataProduct);
    this.dataPd = this.dataProduct.value;
    this.productApi.AddDataProduct(this.dataPd).subscribe(it => {
      console.log(it);
    });
    this.route.navigate(['/store']);
  }
}
