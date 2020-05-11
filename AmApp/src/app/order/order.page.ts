import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CallApiService } from '../call-api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Order, receipt, DataOrder } from '../Models/Order';
import { Product } from '../Models/Product';
import { ProductService } from '../product.service';
import { User } from '../Models/User';





@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  order: FormGroup;
  dataorder: Order;
  dataProduct: Product;
  data: any;
  data1;
  sum: any
  datasum: any
  id: any;
  check: any;
  total: number;
  amountp: number;
  amountnumber: number;
  aamount: any
  ttotal: any
  isShowValidateName: any = false
  isShowValidatetelUser: any = false
  isShowValidateaddressUser: any = false
  isShowValidateamountProduct: any = false
  isShowForm: boolean = true
  mirrorTotalProduct;
  mirrorReceipt: DataOrder;
  dataReceipt = {
    "idReceipt": null,
    "dataOrder": [],
    "date": null,
    "file": null,
    "status": null,
    "statusFile": null
  }
  dataReceiptInArray: receipt;
  oderReceipt: Order;
  oderReceiptById: Order;
  userName: any;
  datauser: User;
  dataAll;
  showReceiptData: receipt[] = [];
  nameNG; addressNG; telNG;
  test1: any;
  dataSumAmount; dataSumPrice; lengthData;
  sumAmount: number = 0; sumPrice: number = 0;
  checkTotal:number = 0;checkTotalProduct:string;
  constructor(public productapi: ProductService, public tost: ToastController, public alertController: AlertController, public alertController1: AlertController, public route: Router, public callApi: CallApiService, public navCtrl: NavController, public formbuilder: FormBuilder) {
    this.order = this.formbuilder.group({
      'idOrder': [null],
      'idProduct': [null],
      'nameProduct': [null],
      'amountProduct': [""],
      'priceOrder': [null],
      'nameUser': [""],
      'telUser': [""],
      'addressUser': [""],
      'dateOrder': [null],
      'sendDate': [null],
      'status': [null],
      'userOrder': [null],
      'totalProduct': [""]
    })
  }

  calldataUser() {
    this.userName = this.callApi.nameUser
    console.log(this.userName);
    this.callApi.GetUserbyData(this.userName).subscribe(it => {
      console.log(it);
      this.datauser = it
      this.order.value.addressUser = this.datauser.addressUser
      console.log(this.order.value.addressUser);

    });
  }

  get f() { return this.order.controls; }
  gotolist() {
    this.route.navigate(['/list']);
  }
  test() {
    console.log(5);

  }
  async presentToast1() {
    const toast = await this.tost.create({
      message: 'สั่งซื้อสินค้าเรียบร้อย',
      duration: 1000,
      color: "success",
      position: 'top'
    });
    toast.present();
  }
  async presentAlert1() {
    const alert = await this.alertController1.create({
      header: 'เตือน',

      message: 'สินค้าคงเหลือในคลังสินค้าไม่พอ',
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentAlert3() {
    const alert = await this.alertController1.create({
      header: 'เตือน',

      message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentAlert2() {
    const alert = await this.alertController1.create({
      header: 'เตือน',

      message: 'กรุณากรอกจำนวนสินค้าให้ถูกต้อง',
      buttons: ['OK']
    });

    await alert.present();
  }
  async sold() {
    const alert = await this.alertController1.create({
      header: 'เตือน',

      message: 'สินค้าชิ้นนี้หมดแล้ว',
      buttons: ['OK']
    });

    await alert.present();
  }
  async stock() {
    const alert = await this.alertController1.create({
      header: 'เตือน',

      message: 'อยู่ระหว่างการตัดสต๊อก',
      buttons: ['OK']
    });

    await alert.present();
  }

  showOrderReceipt() {
    this.callApi.GetListAllProduct().subscribe(it => {
      console.log(it);
      this.oderReceipt = it
    })
    this.callApi.GetMirrorDataOrderAll().subscribe(it => {
      console.log(it);
      this.mirrorReceipt = it
    })
  }

  AddList(data, amountp) {
    this.dataAll = data
    console.log(this.dataAll);

    this.order.value.userOrder = this.callApi.nameUser
    console.log(this.order.value.userOrder);
    console.log(this.order.value);

    this.dataorder = this.order.value;
    console.log(this.dataorder);

    this.callApi.GetProductid(this.dataorder.idProduct).subscribe(it => {
      this.ttotal = it.totalProduct
      this.aamount = this.dataorder.amountProduct

      this.amountnumber = parseInt(this.aamount, this.amountnumber)
      this.total = parseInt(this.ttotal, this.total)
      console.log(it);
      this.isShowValidateName = false;
      this.isShowValidatetelUser = false;
      this.isShowValidateaddressUser = false;
      this.isShowValidateamountProduct = false;
      console.log("จำนวน " + this.amountnumber);
      console.log("คงเหลือ " + this.total);
      console.log(amountp);
      console.log(this.data1.totalProduct);

      this.callApi.GetProductBydata(data).subscribe(it => {
        this.data1 = it
        this.data1.totalProduct = this.data1.totalProduct
        console.log(this.amountnumber);
        console.log(this.total);
        if (this.amountnumber <= this.total && this.amountnumber != 0) {
          this.order.value.idOrder = '_' + Math.random().toString(36).substr(2, 9);

          this.dataReceipt.dataOrder.push(this.order.value)
          console.log(this.dataReceipt.dataOrder);
          this.amountnumber = 0
          this.total = 0
          this.lengthData = this.dataReceipt.dataOrder.length
          console.log(this.lengthData);
          this.dataSumAmount = this.dataReceipt.dataOrder.map(it => it.amountProduct);
          console.log(this.dataSumAmount);
          this.sumAmount = 0;
          for (let index = 0; index < this.dataSumAmount.length; index++) {
            this.sumAmount += parseInt(this.dataSumAmount[index]);
          }
          console.log(this.sumAmount);

          this.dataSumPrice = this.dataReceipt.dataOrder.map(it => it.priceOrder);
          console.log(this.dataSumPrice);
          this.sumPrice = 0;
          for (let index = 0; index < this.dataSumPrice.length; index++) {
            this.sumPrice += parseInt(this.dataSumPrice[index]);
          }
          console.log(this.sumPrice);

          this.showOrderReceipt()
          console.log(data);
          this.order.reset()
          this.isShowForm = true;
        }
        else if (this.amountnumber == 0) {
          this.presentAlert2();
          this.total = 0;
          this.amountnumber = 0;
        }
        else if (amountp > this.data1.totalProduct) {
          console.log(amountp);
          console.log(this.data1.totalProduct);
          this.presentAlert1();
        }
        console.log(this.data1);
        this.callApi.GetProductBydata(data).subscribe(it => {
          console.log(it);
          this.order.reset();
          this.data1 = null;
        })
      });
    });
  }

  addReceipt(id) {
    console.log(id);

    this.showOrderReceipt()
    console.log(this.oderReceipt);
    this.dataReceipt.file = "ไม่พบไฟล์"
    this.sumAmount = 0;
    this.sumPrice = 0;   
    console.log(this.dataReceipt.dataOrder);

    this.callApi.AddReceipt(this.dataReceipt).subscribe(it => {
      console.log(it);
      console.log(this.order.value.idProduct);
      console.log(this.order.value);
      for (let index = 0; index < this.dataReceipt.dataOrder.length; index++) {
        this.test1 = this.dataReceipt.dataOrder[index];
        console.log(this.test1.idProduct);
        this.productapi.AddSellTotalProduct(this.test1.idProduct, this.test1).subscribe(it => {
          console.log(it);
        });
      }
      this.dataReceipt.dataOrder.length = 0;
      this.route.navigate(['/list']);
    });   
  }

  PopList(id) {
    console.log(id);
    this.dataReceipt.dataOrder.pop();   
  }

  ngOnInit() {
    this.listdata()
    this.showOrderReceipt()    
    this.lengthData = this.dataReceipt.dataOrder.length
    console.log(this.lengthData);
  }

  clear() {
    this.sumAmount = 0;
    this.sumPrice = 0;
    this.dataReceipt.dataOrder.length = 0;
  }

  listdata() {
    this.callApi.getallproduct().subscribe(it => {

      this.dataProduct = it;
      console.log(this.dataProduct);

      console.log(it.total);

    })
  }
  getbydata(data) {
    this.callApi.GetProductBydata(data).subscribe(it => {
      this.data1 = it
      this.datasum = it
      this.checkTotal = it.showTotal
      this.checkTotalProduct = it.totalProduct
      console.log(it);      
      if (it.totalProduct == "0") {
        this.sold()
        console.log("สินค้าหมดแล้ว");
        this.data1 = null;
      }
      else if(it.showTotal == 1) {
        this.stock()        
        this.data1 = null;        
      }
     
    });
  }

  onChange(data) {

    this.isShowForm = false
    this.amountp = null
    this.sum = null
    this.getbydata(data)
    this.userName = this.callApi.nameUser
    console.log(this.userName);
    this.callApi.GetUserbyData(this.userName).subscribe(it => {
      console.log(it);
      this.datauser = it
      this.order.value.nameUser = this.datauser.nameUser
      this.order.value.addressUser = this.datauser.addressUser
      this.order.value.telUser = this.datauser.telUser
      this.nameNG = this.order.value.nameUser
      this.addressNG = this.order.value.addressUser
      this.telNG = this.order.value.telUser

    });
  }
  amount(qs) {
    this.amountp = qs
    console.log(qs);

    
    // console.log(q);
    this.sum = qs * this.datasum.priceProduct;

    // console.log(this.sum);

  }
}
