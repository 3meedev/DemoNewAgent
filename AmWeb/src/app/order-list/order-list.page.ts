import { Component, OnInit } from '@angular/core';
import { ProductService } from "../service/product.service";
import { product } from 'src/Models/product';
import { admin } from 'src/Models/user';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Order, receipt } from 'src/Models/order';
import { OrderService } from '../service/order.service';
import { AlertController, ToastController } from '@ionic/angular';
import { DetailProductPage } from 'src/app/detail-product/detail-product.page';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],

})





export class OrderListPage implements OnInit {

  dataOrder: Order;
  dataOrderReceript: receipt;
  dataReceipt: Order[] = [];
  dataProduct: product;
  dataUser: admin;
  data
  dataReceiptAll: Order[] = [];
  order: any;
  datafilter: Order[] = [];
  arrayfilter: Order[] = [];
  dataReturned: any;
  DataOrder;
  DataReceipt;
  name;address;tel;
  isShowText:boolean = true;

  constructor(
    public route: Router,
    public productApi: ProductService,
    public navCtrl: NavController,
    public userApi: UserService,
    public orderApi: OrderService,
    public alertController: AlertController,
    public tost: ToastController,
    public modalController: ModalController
  ) { }

  ///////////////////////////////////////////////////////////////
  ngOnInit() {
    this.showDataReceript()
    this.userApi.GetAdminAll().subscribe(it => {
      console.log(it);
      this.dataUser = it;
      console.log(this.dataUser);
    });

  }

  ionViewDidEnter() {
    this.showDataReceript()
  }

  openModal(id) {
    console.log(id);

    this.orderApi.GetReceiptById(id).subscribe(it => {
      console.log(it);
      this.DataOrder = it
      console.log(this.DataOrder.senddate);
      
      for (let index = 0; index < this.DataOrder.dataOrder.length; index++) {
        this.dataReceiptAll[index] = this.DataOrder.dataOrder[index];    
        console.log(this.dataReceiptAll[index].nameUser);            
        this.name = this.dataReceiptAll[index].nameUser;
                this.address = this.dataReceiptAll[index].addressUser;
        this.tel = this.dataReceiptAll[index].telUser;
      }  
      this.modal()
    });

  }

  cancel(id){
    console.log(id);
    this.orderApi.DeleteReceipt(id).subscribe(it => {
      console.log(it);
      this.showDataReceript()
    })
    
  }

  async modal() {
    const modal = await this.modalController.create({
      component: DetailProductPage,
      componentProps: {
        "idReceipt": this.DataOrder.idReceipt,
        "nameProduct": this.DataOrder.nameProduct,
        "amountProduct": this.DataOrder.amountProduct,
        "priceOrder": this.DataOrder.priceOrder,
        "nameUser": this.name,
        "telUser": this.tel,
        "addressUser": this.address,
        "status": this.DataOrder.status,
        "file": this.DataOrder.file,
        "date": this.DataOrder.date,
        "senddate": this.DataOrder.sendDate,
        "statusFile": this.DataOrder.statusFile
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
    });

    return await modal.present();
  }

  // getall() {
  //   this.orderApi.GetListAllProduct().subscribe(it => {
  //     console.log(it);
  //     this.dataOrder = it;
  //     console.log(this.dataOrder);
  //   });
  // }
  countdata
  // getdataarray() {
  //   this.orderApi.GetListAllProduct().subscribe(it => {
  //     this.dataOrder = it;
  //     console.log(this.dataOrder);
  //     for (let index = 0; index < Object.keys(this.dataOrder).length; index++) {
  //       this.datafilter[index] = this.dataOrder[index]
  //       this.arrayfilter[index] = this.datafilter[index]
  //     }
  //     this.countdata = Object.keys(this.datafilter).length

  //   });
  // }
  //////////////////////////////////////////////////////////////
  ///*/////////////////////// filter///////////////////////////
  onChange(data) {
    if (data == "ทั้งหมด") {
      this.showDataReceript()
    }

    else {
      this.datafilter = this.arrayfilter.filter(it =>
        it.status == data

      )     
    }
  }

  ///////////////// แจ้งเตือน/////////////////////////////////////
  async presentToast() {
    const toast = await this.tost.create({
      message: ' รับ Order Succes ',
      duration: 2000,
      color: "success",
      position: 'top'
    });
    toast.present();
  }

  async presentToast1() {
    const toast = await this.tost.create({
      message: '่ ส่งสินค้า Succes ',
      duration: 2000,
      color: "secondary",
      position: 'top'
    });
    toast.present();
  }

  ////////////////////////////////////////////////////////////
  /////////////////////////////ยกเลิก Order////////////////////////
  getid(id) {
    this.orderApi.GetReceiptById(id).subscribe(it => {
      console.log(it);
      this.data = it
      console.log(this.data);
      this.editokorder(id)
    });

  }
  editokorder(id) {
    console.log(id);
    this.orderApi.editokorder(id, this.data).subscribe(it => {
      this.data = it;
      console.log(this.data);
      this.showDataReceript()
    });
  }
  async okorder(id) {
    const alert = await this.alertController.create({
      header: 'ยืนยันการรับ Order',

      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('ยกเลิก');
          }
        }, {
          text: 'ตกลง',
          handler: () => {
            this.getid(id)
            this.presentToast();

          }
        }
      ]
    });

    await alert.present();
  }
  ///////////////////////////////////////////////////////////////
  ///////////////////////////////รับของ Order///////////////////////////////
  async sendorder(id) {
    const alert = await this.alertController.create({
      header: 'ยืนยันการส่งสินค้า',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('ยกเลิก');
          }
        }, {
          text: 'ตกลง',
          handler: () => {
            this.presentToast1()
            this.sendid(id)
          }
        }
      ]
    });
    await alert.present();
  }
  sendid(id) {
    this.orderApi.GetReceiptById(id).subscribe(it => {
      console.log(it);
      this.data = it
      console.log(this.data);
      this.editsendorder(id)
    });
  }
  editsendorder(id) {
    this.orderApi.editsendorder(id, this.data).subscribe(it => {
      this.data = it;
      console.log(it);
      this.showDataReceript()
    });
  }

  getdetail(id) {
    this.route.navigate(['/detail', { _id: id }]);
  }

  showDataReceript() {
    this.orderApi.getAllReceipt().subscribe(it => {
      console.log(it);
      this.DataReceipt = it
      this.countdata = Object.keys(this.DataReceipt).length
      if(Object.keys(this.DataReceipt).length == 0){
        this.isShowText = true
      } else {
        this.isShowText = false
      }
    })
  }

  // showDataReceiptById() {
  //   this.orderApi.GetReceiptById(this.data).subscribe(it => {
  //     console.log(it);
  //     this.dataOrderReceript = it
  //     console.log(this.dataOrderReceript.dataOrder);
  //     for (let index = 0; index < this.dataOrderReceript.dataOrder.length; index++) {
  //       this.dataReceipt[index] = this.dataOrderReceript.dataOrder[index];
  //       console.log(this.dataReceipt[index]);
  //     }
  //   });
  // }




}

