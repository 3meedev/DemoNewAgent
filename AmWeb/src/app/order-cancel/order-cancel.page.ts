import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';

import { product } from 'src/Models/product';
@Component({
  selector: 'app-order-cancel',
  templateUrl: './order-cancel.page.html',
  styleUrls: ['./order-cancel.page.scss'],
})
export class OrderCancelPage implements OnInit {

  isIndeterminate:boolean;
  masterCheck:boolean;
  checkBoxList:any;
 
 
  constructor(){
    this.checkBoxList = [
      {
        value:"Esteban Gutmann IV",
        isChecked:false
      },{
        value:"Bernardo Prosacco Jr.",
        isChecked:false
      },{
        value:"Nicholaus Kulas PhD",
        isChecked:false
      },{
        value:"Jennie Feeney",
        isChecked:false
      },{
        value:"Shanon Heaney",
        isChecked:false
      }
    ];
  }
 
 
  checkMaster() {
    setTimeout(()=>{
      this.checkBoxList.forEach(obj => {
        obj.isChecked = this.masterCheck;
      });
    });
  }
 
  checkEvent() {
    const totalItems = this.checkBoxList.length;
    let checked = 0;
    this.checkBoxList.map(obj => {
      if (obj.isChecked) checked++;
    });
    if (checked > 0 && checked < totalItems) {
      //If even one item is checked but not all
      this.isIndeterminate = true;
      this.masterCheck = false;
    } else if (checked == totalItems) {
      //If all are checked
      this.masterCheck = true;
      this.isIndeterminate = false;
    } else {
      //If none is checked
      this.isIndeterminate = false;
      this.masterCheck = false;
    }
  }
 

  ngOnInit() {
 
    
    

  }



 
 
}

