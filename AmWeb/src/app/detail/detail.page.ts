import { Component, OnInit } from '@angular/core';
import { Order } from 'src/Models/order';
import { Router, ActivatedRoute } from '@angular/router';
import { CallApiService } from 'src/app/service/call-api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  dataOrder: Order;
  data: any;


  constructor(public route: Router, public callApi: CallApiService, public activate: ActivatedRoute, public formbuilder: FormBuilder ,public alertController:AlertController) {
    this.data = this.activate.snapshot.paramMap.get('_id');
  }

  ngOnInit() {
    this.callApi.GetProductById(this.data).subscribe(it => {
      console.log(it);
      this.dataOrder = it
      console.log(this.dataOrder);
    });
  }    
}
