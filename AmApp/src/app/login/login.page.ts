import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CallApiService } from '../call-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../Models/User';
import { MenuController, AlertController } from '@ionic/angular';
import { log } from 'util';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: FormGroup;
  datauser: User;
  user1: any;
  datausername: User;
  usercheck
  passcheck
  constructor(public alertController: AlertController, public route: Router, public callApi: CallApiService, public form: FormBuilder, public menuCtrl: MenuController) {
    this.stopit()
    this.user = this.form.group({
      'user': ["", Validators.required],
      'password': ["", Validators.required]
    });
  }

  async presentAlertPass() {
    const alert = await this.alertController.create({
      header: 'เตือน',

      message: 'Password ไม่ถูกต้อง',
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentAlertUser() {
    const alert = await this.alertController.create({
      header: 'เตือน',

      message: 'ไม่มี Username นี้ในระบบ',
      buttons: ['OK']
    });

    await alert.present();
  }

  async  presentAlertUserlandPassWordnoMacth() {
    const alert = await this.alertController.create({
      header: 'เตือน',

      message: ' Username หรือ Password ถูกต้อง',
      buttons: ['OK']
    });

    await alert.present();
  }
  async  PassWordnoMacth() {
    const alert = await this.alertController.create({
      header: 'เตือน',

      message: ' Password ไม่ถูกต้อง',
      buttons: ['OK']
    });

    await alert.present();
  }
  async  presentAlertUsernullandPassWordnonull() {
    const alert = await this.alertController.create({
      header: 'เตือน',

      message: 'กรุณากรอก Username และ Password',
      buttons: ['OK']
    });

    await alert.present();
  }
  async  passwordnull() {
    const alert = await this.alertController.create({
      header: 'เตือน',

      message: 'กรุณากรอก Password',
      buttons: ['OK']
    });

    await alert.present();
  }
  async  usernamenull() {
    const alert = await this.alertController.create({
      header: 'เตือน',

      message: 'กรุณากรอก Username ',
      buttons: ['OK'],

    });

    await alert.present();

  }
  async  userban() {
    const alert = await this.alertController.create({
      header: 'เตือน',

      message: 'บัญชีนี้ถูกระงับการใช้งาน ',
      buttons: ['OK'],

    });

    await alert.present();

  }

  stopit() {
    this.menuCtrl.close();
    this.menuCtrl.enable(false);
  }

  ionViewWillEnter() {
    this.stopit()
    this.callApi.GetUserData().subscribe(it => {
      this.user1 = it
      this.datauser = it
      console.log(this.datauser);
    })
    
  }
 
  ngOnInit() {

    this.callApi.GetUserData().subscribe(it => {

      this.user1 = it
      this.datauser = it
      console.log(this.datauser);

    })
    this.stopit()
  }


  getdatabyUsername() {

    console.log(this.user.value.user);
    this.callApi.GetUserbyData(this.user.value.user).subscribe(it => {

      this.datausername = it
      console.log(this.datausername);
    })

  }

  eiei(){
console.log(54135131);
  
  }



  gotoList() {
    if (this.user.value.user != "" && this.user.value.password != "") {
      this.callApi.GetUserbyData(this.user.value.user).subscribe(it => {
        this.datausername = it
        console.log(this.datausername);
        if (this.datausername == null) {
          console.log("ไม่พบ User");
          this.presentAlertUser();
        } else {
          if (this.user.value.user == this.datausername.username && this.user.value.password == this.datausername.password) {
            if (this.datausername.statusUser == "ถูกระงับ") {
              console.log("ban");
              this.userban();
            }
            else {
              console.log("welcome");
              this.callApi.nameUser = this.datausername.username
              this.callApi.name = this.datausername.nameUser
              this.route.navigate(['/list', { _id: this.datausername.statusUser }])
            }
          }
          else if (this.user.value.user == this.datausername.username && this.user.value.password != this.datausername.password) {
            console.log("Password ไม่ถูกต้อง");
            this.PassWordnoMacth();
          }
        }
      })
    }
    else if (this.user.value.user == "" && this.user.value.password == "") {
      this.presentAlertUsernullandPassWordnonull();
      console.log("Press Enter Username and Password");
    }
    else if (this.user.value.user == "" && this.user.value.password != "") {
      this.usernamenull();
      console.log("Press Enter  username");
    }
    else if (this.user.value.user != "" && this.user.value.password == "") {
      console.log("Press Enter  Password");
      this.passwordnull();
    }

    // for (let index = 0; index < Object.keys(this.datauser).length; index++) {
    //   console.log(this.datauser[index]);
    //   if (this.datauser[index].username == this.user.value.user && this.user.value.password == this.datauser[index].password) {
    //     // console.log("pass");
    //     console.log(this.datauser[index].username);
    //     console.log(this.datauser[index].password);
    //     this.callApi.nameUser = this.datauser[index].nameUser
    //     this.callApi.levelUser = this.datauser[index].levelUser
    //     // console.log(this.callApi.Account);
    //     // console.log(this.callApi.Account);
    //     this.usercheck = this.datauser[index].username
    //     this.passcheck = this.datauser[index].password
    //     this.route.navigate(['/list']);

    //     break
    //   }

    //   else if (this.user.value.user == null && this.user.value.password != null) {
    //     this.usernamenull();
    //     break;
    //   }
    //   else if (this.user.value.password == null && this.user.value.user != null) {
    //     this.passwordnull();
    //     break;
    //   }
    //   else if (this.user.value.user == null && this.user.value.password == null) {
    //     this.presentAlertUsernullandPassWordnonull();
    //     break;
    //   }
    //   else if (this.user.value.user == "" && this.user.value.password != "") {
    //     this.usernamenull();
    //     break;
    //   }
    //   else if (this.user.value.password == "" && this.user.value.user != "") {
    //     this.passwordnull();
    //     break;
    //   }
    //   else if (this.user.value.user == "" && this.user.value.password == "") {
    //     this.presentAlertUsernullandPassWordnonull();
    //     break;
    //   }
    // }
  }

}


