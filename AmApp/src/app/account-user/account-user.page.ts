import { Component, OnInit } from '@angular/core';
import { CallApiService } from '../call-api.service';
import { User } from '../Models/User';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { EditProfilePage } from 'src/app/edit-profile/edit-profile.page';
import { ChangePassPage } from 'src/app/change-pass/change-pass.page';
import { faUserLock } from '@fortawesome/free-solid-svg-icons' 
import { faUserCircle } from '@fortawesome/free-solid-svg-icons' 



@Component({
  selector: 'app-account-user',
  templateUrl: './account-user.page.html',
  styleUrls: ['./account-user.page.scss'],
})
export class AccountUserPage implements OnInit {
  userName: any;
  datauser: User;
  dataReturned: any;
  faUserLock=faUserLock;
  faUserCircle=faUserCircle;



  constructor(public callApi: CallApiService, public route: Router, private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.userName = this.callApi.nameUser
    console.log(this.userName);

  }
  ionViewDidEnter() {
    this.calldataUser();
    console.log(this.callApi.ref);    
    if (this.callApi.ref == true) {
      this.calldataUser();
    }
  }

  public EditData(id) {
    console.log(id);

  }

  calldataUser() {
    this.userName = this.callApi.nameUser
    console.log(this.userName);
    this.callApi.GetUserbyData(this.userName).subscribe(it => {
      console.log(it);
      this.datauser = it
    });
  }
  gotolist() {
    this.route.navigate(['/list']);
  }

  async modal(id) {
    // this.route.navigate(['/edit-profile', { _id: id }]);
    const modal = await this.modalController.create({
      component: EditProfilePage,
      //cssClass: 'my-custom-modal-css',
      componentProps: {
        "id": id
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
    });

    return await modal.present();
  }

  async modalPass(id) {
    // this.route.navigate(['/edit-profile', { _id: id }]);
    const modal = await this.modalController.create({
      component: ChangePassPage,
      componentProps: {
        "id": id
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
    });

    return await modal.present();
  }
}
