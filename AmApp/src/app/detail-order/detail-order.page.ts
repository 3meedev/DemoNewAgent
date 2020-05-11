import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CallApiService } from '../call-api.service';
import { Order, receipt } from '../Models/Order';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.page.html',
  styleUrls: ['./detail-order.page.scss'],
})
export class DetailOrderPage implements OnInit {

  id; idProduct; nameProduct; amountProduct; priceOrder; nameUser; telUser; addressUser;
  dataOrder: Order;
  isShowText: boolean = true;
  isShowForm: boolean = true;
  isShowEdit: boolean = true;
  isShowCon: boolean = true;

  constructor
    (private modalController: ModalController, private navParams: NavParams, public callApi: CallApiService,public Location:Location) {
    this.id = this.navParams.data.id;
    console.log(this.id);
  }

  ngOnInit() {
    this.showData()
  }

  update() {
    this.isShowText = true
    this.isShowForm = true
    this.isShowEdit = true
    this.isShowCon = true
  }

  toUpdate() {
    this.isShowText = false
    this.isShowForm = false
    this.isShowEdit = false
    this.isShowCon = false
  }

  showData() {

    this.callApi.GetProductById(this.id).subscribe(it => {
      console.log(it);
      this.dataOrder = it
      this.idProduct = this.navParams.data.idProduct;
      this.nameProduct = this.navParams.data.nameProduct;
      this.amountProduct = this.navParams.data.amountProduct;
      this.priceOrder = this.navParams.data.priceOrder;
      this.nameUser = this.navParams.data.nameUser;
      this.telUser = this.navParams.data.telUser;
      this.addressUser = this.navParams.data.addressUser;
    })
  }
goback(){
  this.modalController.dismiss();
 

}
}
