import { Component, OnInit } from '@angular/core';
import { Order } from 'src/Models/order';
import { product } from 'src/Models/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from "src/app/service/product.service";
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],

})
export class OrderPage implements OnInit {
  order: FormGroup
  dataProduct: any;
  data1: {};
  dataorder: Order
  summ: any
  sum: any;
  datasum: any;
  t: number;
  a: number;
  q: number;
  aa: any
  tt: any
  qq: any
  checktel: any
  checkamountProduct: any
  isShowValidateName: boolean = false;
  isShowValidatetelUser: boolean = false;
  isShowValidateaddressUser: boolean = false;
  constructor(public callapiOrder: OrderService, public callapiProduct: ProductService, public formbuilder: FormBuilder, public alertController: AlertController, public router: Router) {
    this.order = this.formbuilder.group({
      'idOrder': [null],
      'idProduct': [null],
      'nameProduct': [null],
      'amountProduct': [null, Validators.compose([Validators.pattern('([0-9])*'), Validators.required])],
      'priceOrder': [null],
      'nameUser': [""],
      'telUser': ["", Validators.compose([Validators.pattern('(^0)([1-9]){2}-([1-9]){3}-([0-9]){4}$'), Validators.required])],
      'addressUser': [""],
      'dateOrder': [null],
      'sendDate': [null],
      'status': [null],
      'type': [null],
      'price': [null],
      'total': [null]
    })
  }
  ////////////////va///////////////////////////////////
  public errorMessages = {
    telUser: [
      { type: 'pattern', message: 'กรุณากรอกเบอร์โทรให้ถูกต้อง 0XX-XXX-XXXX' }
    ],
    amountProduct: [
      { type: 'pattern', message: 'กรุณากรอกเฉพาะตัวเลข' }
    ],
  };
  get amountProduct() {
    return this.order.get("amountProduct");
  }
  get telUser() {
    return this.order.get("telUser");
  }
  get f() {

    return this.order.controls;

  }


  ////////////////////////////////////////////////////////

  ionViewDidEnter() {
    this.listdata()
  }
  ngOnInit() {

  }
  listdata() {
    this.callapiProduct.GetProductAll().subscribe(it => {
      console.log(it);
      this.dataProduct = it;
      console.log(this.dataProduct);
    })
  }
  getbydata(data) {
    this.callapiProduct.GetProductBydata(data).subscribe(it => {

      this.data1 = it
      this.datasum = it
      console.log(this.data1);
      this.qq = 0
      if (it.totalProduct == "0") {
        this.sold()
        console.log("สินค้าหมดแล้ว");

      }

    });
  }
  onChange(data) {
    this.q = null;
    this.data1 = null
    this.sum = null
    this.summ = null
    this.qq = null

    this.getbydata(data)


    // console.log(data);
  }

  amount(qs) {
    this.qq = qs
    console.log(this.qq);
    this.sum = qs * this.datasum.priceProduct
    console.log(this.sum);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: '',
      message: '<strong>ยืนยันการสั่งซื้อ</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'ok',
          handler: () => {
            this.isShowValidateName = false;
            this.isShowValidatetelUser = false;
            this.isShowValidateaddressUser = false;
            console.log(this.order.value);
            console.log(this.order);
            this.dataorder = this.order.value;
            console.log(this.dataorder);
            this.callapiProduct.GetProductByid(this.dataorder.idProduct).subscribe(it => {
              console.log(this.dataorder.amountProduct);
              this.tt = it.totalProduct
              this.aa = this.dataorder.amountProduct
              this.a = parseInt(this.aa, this.a)
              this.t = parseInt(this.tt, this.t)
     
              console.log(it);
              if (this.a <= this.t && this.a != 0 && this.dataorder.nameUser != "" && this.dataorder.telUser != "" && this.dataorder.addressUser != "") {
                console.log('dai');
                this.t = 0;
                this.a = 0;
                this.okAlert();
              }


              else if (this.a == 0) {
                this.presentAlert2();
                this.listdata()
                console.log('ใส่ไม่ถูก');
                this.t = 0;
                this.a = 0;
              }
              else if (this.a > this.t) {
                console.log('ของหมด');
                this.listdata()
                this.presentAlert1();
                this.t = 0;
                this.a = 0;
              }
              else {
                  this.presentAlert3();
                if (this.dataorder.nameUser == "") {
                  console.log("name");
                  this.isShowValidateName = true;
                }
                if (this.dataorder.telUser == "") {
                  console.log("เทล");
                  this.isShowValidatetelUser = true;
                }
                if (this.dataorder.addressUser == "") {
                  console.log("แอดเดส");
                  this.isShowValidateaddressUser = true;
                }
                // else {

                
                //   this.t = 0;
                //   this.a = 0;
                // }

              }

            })

          }
        }
      ]
    });

    await alert.present();
  }
  async presentAlert1() {
    const alert = await this.alertController.create({
      header: 'แจ้งเตือน',

      message: 'สินค้าคงเหลือในคลังสินค้าไม่พอ',
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentAlert2() {
    const alert = await this.alertController.create({
      header: 'แจ้งเตือน',

      message: 'กรุณากรอกจำนวนสินค้าให้ถูกต้อง',
      buttons: ['OK']
    });

    await alert.present();
  }

  async okAlert() {
    const alert = await this.alertController.create({
      header: 'แจ้งเตือน!',
      message: 'สั่งซื้อสินค้าเรียบร้อย',
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            this.callapiOrder.AddOrder(this.dataorder).subscribe(it => {
              console.log(it);

            });
            this.callapiProduct.AddSellTotalProduct(this.order.value.idProduct, this.order.value).subscribe(it => {
              console.log(it);
            });

            this.router.navigate(['/order-list']);
          }
        }
      ]
    });

    await alert.present();
  }
  async sold() {
    const alert = await this.alertController.create({
      header: 'เตือน',

      message: 'สินค้าชิ้นนี้หมดแล้ว',
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentAlert3() {
    const alert = await this.alertController.create({
      header: 'เตือน',

      message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      buttons: ['OK']
    });

    await alert.present();
  }
}
