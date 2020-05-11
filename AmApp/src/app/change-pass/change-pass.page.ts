import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CallApiService } from '../call-api.service';
import { User } from '../Models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.page.html',
  styleUrls: ['./change-pass.page.scss'],
})
export class ChangePassPage implements OnInit {

  dataUser: FormGroup;
  dataUserz: User;
  editDatauser: any;
  submit: boolean = false;
  id;

  constructor(public activate: ActivatedRoute,
    public userApi: CallApiService,
    public formbuilder: FormBuilder,
    public route: Router,
    private modalController: ModalController,
    private navParams: NavParams, ) {
    this.id = this.navParams.data.id;
    // this.editDatauser = this.activate.snapshot.paramMap.get('_id');
    console.log(this.editDatauser);
    this.dataUser = this.formbuilder.group({
      'idUser': [null, Validators.required],
      'nameUser': [null, Validators.required],
      'username': [null, Validators.required],
      'password': [null, Validators.required],
      'telUser': [null, Validators.required],
      'statusUser': [null, Validators.required],
      'addressUser': [null, Validators.required],
      'newpassword': [null, Validators.required],
      're-newpassword': [null, Validators.required],
      'cardUser': [null, Validators.required]

    });


  }

  ngOnInit() {
  }



  async close() {
    await this.modalController.dismiss();    
  }

}
