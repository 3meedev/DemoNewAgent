import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Order, receipt } from 'src/Models/order';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from "../service/order.service";

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.page.html',
  styleUrls: ['./detail-product.page.scss'],
})
export class DetailProductPage implements OnInit {

  idOrder; idReceipt; nameProduct; amount; price; nameUser; tel; address; date; status; file; senddate;statusFile;
  isShowDataOrder: boolean = true;
  showDataOrderAdd: boolean = true;
  showDataOrderRemove: boolean = true;
  isShowFile: boolean = false;
  isShowAdd: boolean = false;
  isShowRemove: boolean = false;
  dataOrder: receipt;
  dataReceipt: Order[] = [];
  name;addressUser;telUser;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public api:OrderService

  ) {

  }

  ngOnInit() {
    console.table(this.navParams);
    this.showDataReceipt()
    this.idReceipt = this.navParams.data.idReceipt;
    this.nameProduct = this.navParams.data.nameProduct;
    this.amount = this.navParams.data.amount;
    this.price = this.navParams.data.price;
    this.nameUser = this.navParams.data.nameUser;
    this.tel = this.navParams.data.telUser;
    this.address = this.navParams.data.addressUser;
    this.status = this.navParams.data.status;
    this.file = this.navParams.data.file;
    this.date = this.navParams.data.date;
    this.senddate = this.navParams.data.senddate;
    this.statusFile = this.navParams.data.statusFile;
  }

  show() {
    this.isShowAdd = true;
    this.isShowRemove = true;
    this.isShowFile = true;
  }

  close() {
    this.isShowAdd = false;
    this.isShowRemove = false;
    this.isShowFile = false;
  }

  showDataReceipt() {
    this.api.GetReceiptById(this.idReceipt).subscribe(it => {
      console.log(it);
      this.dataOrder = it
      console.log(this.dataOrder.dataOrder);           
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


}
