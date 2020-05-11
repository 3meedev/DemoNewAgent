import { Component, OnInit } from '@angular/core';
import { Order, receipt, DataOrder } from '../Models/Order';
import { Router, ActivatedRoute } from '@angular/router';
import { CallApiService } from '../call-api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { ProductService } from "../product.service";
import { DetailOrderPage } from 'src/app/detail-order/detail-order.page';
import { ModalController } from '@ionic/angular';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons' 



@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.page.html',
  styleUrls: ['./orderdetail.page.scss'],
})
export class OrderdetailPage implements OnInit {
  faFileUpload=faFileUpload;
  dataOrder: receipt;
  data: any;
  dataReturned: any;
  dataReceipt: Order[] = [];
  isShowDataOrder: boolean = true;
  showDataOrderAdd: boolean = true;
  showDataOrderRemove: boolean = true;
  
  dataOrderById: receipt;
  OrderById: DataOrder;
  // dataTest;
  dataTest = {
    "data": [],
  }
  dataFilter: any;
  dataFilterSuccess: any;
  idProduct; nameProduct; amountProduct; priceOrder; nameUser; telUser; addressUser;
  constructor(private modalController: ModalController,
     public api: ProductService,
      public route: Router,
       public callApi: CallApiService,
        public activate: ActivatedRoute,
         public formbuilder: FormBuilder,
          public alertController: AlertController,
          public actionSheetController: ActionSheetController) {
    this.data = this.activate.snapshot.paramMap.get('_id');
    console.log(this.data);


  }

  ngOnInit() {
    this.showDataReceipt()
  }

test(idReceipt, idProduct){
 console.log(idProduct);
    console.log(idReceipt);
    this.callApi.GetReceiptById(idReceipt).subscribe(it => {
      console.log(it);
      this.dataOrderById = it
      console.log(this.dataOrderById);
      for (let index = 0; index < this.dataOrderById.dataOrder.length; index++) {
        this.dataTest.data[index] = this.dataOrderById.dataOrder[index]
        console.log(this.dataTest);
      }
      this.dataFilter = this.dataTest.data.filter(it => it.idProduct == idProduct);
      this.dataFilterSuccess = this.dataFilter[0]
      console.log(this.dataFilterSuccess.idProduct);
      this.presentActionSheet()
    })


}

  async presentActionSheet() {
   

   
    

    const actionSheet = await this.actionSheetController.create({
      header: 'รายละเอียดสินค้า',
      
     cssClass:'a',
      buttons: [{
        text:  'รหัสสินค้า :'+this.dataFilterSuccess.idProduct,
        cssClass:'actionSheet',
        role:'dismiss'
      }, {
        text: 'ชื่อ :'+this.dataFilterSuccess.nameProduct,
        cssClass:'actionSheet'
        
        
      }, {
        text: 'จำนวน :'+this.dataFilterSuccess.amountProduct,
        cssClass:'actionSheet'
      }, {
        text: 'ราคา :'+this.dataFilterSuccess.priceOrder,
        cssClass:'actionSheet'
      }]
    });
    await actionSheet.present();
  }


 

  showDataOrderById(idReceipt, idProduct) {
    console.log(idProduct);
    console.log(idReceipt);

    this.callApi.GetReceiptById(idReceipt).subscribe(it => {
      console.log(it);
      this.dataOrderById = it
      console.log(this.dataOrderById);
      for (let index = 0; index < this.dataOrderById.dataOrder.length; index++) {
        this.dataTest.data[index] = this.dataOrderById.dataOrder[index]
        console.log(this.dataTest);
      }
      this.dataFilter = this.dataTest.data.filter(it => it.idProduct == idProduct);
      this.dataFilterSuccess = this.dataFilter[0]
      console.log(this.dataFilterSuccess.idProduct);



      this.modal()
    })
  }

  async modal() {

    console.log(this.dataOrderById);


    const modal = await this.modalController.create({
      component: DetailOrderPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {

        "idProduct": this.dataFilterSuccess.idProduct,
        "nameProduct": this.dataFilterSuccess.nameProduct,
        "amountProduct": this.dataFilterSuccess.amountProduct,
        "priceOrder": this.dataFilterSuccess.priceOrder,
        "nameUser": this.dataFilterSuccess.nameUser,
        "telUser": this.dataFilterSuccess.telUser,
        "addressUser": this.dataFilterSuccess.addressUser,
        "statusFile": this.dataFilterSuccess.addressUser
      }
    });


    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
    });


    return await modal.present();

  }

  showDataReceipt() {
    this.callApi.GetReceiptById(this.data).subscribe(it => {
      console.log(it);
      this.dataOrder = it
      console.log(this.dataOrder.dataOrder);
      for (let index = 0; index < this.dataOrder.dataOrder.length; index++) {
        this.dataReceipt[index] = this.dataOrder.dataOrder[index];
        console.log(this.dataReceipt[index]);
      }
    });
  }

  showDataOrder() {
    this.showDataOrderAdd = false;
    this.showDataOrderRemove = false;
    this.isShowDataOrder = false;
  }

  closeDataOrder() {
    this.showDataOrderAdd = true;
    this.showDataOrderRemove = true;
    this.isShowDataOrder = true;
  }

  addFile(id) {
    console.log(id);
    console.log(this.api.imageName);
    

    this.dataOrder.file = this.api.imageName;
    this.callApi.editAddFile(id, this.dataOrder).subscribe(it => {       
     console.log(it);
     

    });

  }

  // editsendorder(id){
  //   this.callApi.editsendorder(id,this.dataOrder).subscribe(it => {
  //     this.dataOrder = it;
  //     console.log(it);
  // });
  // }
  // async alert(id) {
  //       const alert = await this.alertController.create({
  //         header: 'ยืนยันการส่งของ',

  //         buttons: [
  //           {
  //             text: 'ยกเลิก',
  //             role: 'cancel',
  //             cssClass: 'secondary',
  //             handler: (blah) => {
  //               console.log('ยกเลิก');
  //             }
  //           }, {
  //             text: 'ตกลง',
  //             handler: () => {
  //              this.editsendorder(id)

  //             }
  //           }
  //         ]
  //       });

  //       await alert.present();
  //     }
  async alertAddFile(id) {
    const alert = await this.alertController.create({
      header: 'ต้องการแนบหลักฐานการโอนเงินใช่หรือไม่ ?',

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
            this.addFile(id)
            this.route.navigate(['/list']);
          }
        }
      ]
    });

    await alert.present();
  }


}
