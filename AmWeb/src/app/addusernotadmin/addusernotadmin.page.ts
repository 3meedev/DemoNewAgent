import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/service/user.service";
import { user } from 'src/Models/user';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-addusernotadmin',
  templateUrl: './addusernotadmin.page.html',
  styleUrls: ['./addusernotadmin.page.scss'],
})
export class AddusernotadminPage implements OnInit {

  datauser: FormGroup;
  submit: boolean = false;
  data: user;
  
  isShowValidatePassword:boolean = false;
  isShowValidateUsername:boolean = false;
  isShowValidateTel:boolean = false;
  isShowValidateStatus:boolean = false;
  isShowValidateAddress:boolean = false;
  isShowValidateCard:boolean = false;
  isShowValidateName:boolean = false;
  isShowCloseTab: boolean = true;
  isShowOpenTab: boolean = true;


  constructor(private menu: MenuController,public alertController: AlertController, public userApi: UserService, public route: Router, public navCtrl: NavController, public formbuilder: FormBuilder) {
    this.datauser = this.formbuilder.group({
      'iduser': ["", Validators.required],
      'nameuser': ["", Validators.required],
      'username': ["", Validators.required],
      'password': ["", Validators.required],
      'teluser': ["", Validators.compose([Validators.pattern('(^0)([1-9]){2}-([1-9]){3}-([0-9]){4}$'), Validators.required])],
      'statususer': ["", Validators.required],
      'addressuser': ["", Validators.required],
      'carduser': ["", Validators.compose([Validators.pattern('([0-9]){13}$'), Validators.required])]

    })
  }

  async ConfirmLogout() {
    const alert = await this.alertController.create({
      message: 'ต้องการออกจากระบบหรือไม่ ? ',
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            this.route.navigate(['/login'])
          }
        }, {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
  }

  closeTab() {
    this.menu.enable(false);
    this.isShowOpenTab = false;
    this.isShowCloseTab = false;
  }
  openTab() {
    this.menu.enable(true);
    this.isShowOpenTab = true;
    this.isShowCloseTab = true;
  }

  // ---------------------------------------------------------------------- Validate

  public errorMessages = {
    teluser: [      
      { type: 'pattern', message: 'กรุณากรอกเบอร์โทรให้ถูกต้อง 0XX-XXX-XXXX' }
    ],
    carduser: [      
      { type: 'pattern', message: 'กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง [0-9] สิบสามหลัก' }
    ],
  }; 
  get carduser() {
    return this.datauser.get("carduser");
  }
  get teluser() {
    return this.datauser.get("teluser");
  }

  get f() { return this.datauser.controls; }

  async Alert() {
    const alert = await this.alertController.create({
      message: 'กรุณากรอกข้อมูลให้ครบถ้วน.',
      buttons: ['ตกลง']
    });

    await alert.present();
  }

  check() {
    if (this.datauser.value.nameuser != "" && this.datauser.value.username != "" && this.datauser.value.password != "" && this.datauser.value.statususer != ""
      && this.datauser.value.addressuser != "" && this.datauser.value.carduser != "" && this.datauser.value.teluser != "") {
      this.ConfirmInsert();      
      this.isShowValidatePassword = false;
      this.isShowValidateUsername = false;
      this.isShowValidateTel = false;
      this.isShowValidateAddress = false;
      this.isShowValidateCard = false;
      this.isShowValidateName = false;
      this.isShowValidateStatus = false;
      
    }
    else if(this.datauser.value.nameuser == ""){      
      this.isShowValidateName = true;    
      this.isShowValidatePassword = false;
      this.isShowValidateUsername = false;
      this.isShowValidateTel = false;
      this.isShowValidateAddress = false;
      this.isShowValidateCard = false;      
      this.isShowValidateStatus = false;       
      this.Alert();
    }
    else if(this.datauser.value.username == ""){      
      this.isShowValidateUsername = true;
      this.isShowValidatePassword = false;      
      this.isShowValidateTel = false;
      this.isShowValidateAddress = false;
      this.isShowValidateCard = false;
      this.isShowValidateName = false;
      this.isShowValidateStatus = false;      
      this.Alert();
    }
    else if(this.datauser.value.password == ""){
      this.isShowValidatePassword = true;       
      this.isShowValidateUsername = false;
      this.isShowValidateTel = false;
      this.isShowValidateAddress = false;
      this.isShowValidateCard = false;
      this.isShowValidateName = false;
      this.isShowValidateStatus = false;    
      this.Alert();
    }
    else if(this.datauser.value.statususer == ""){      
      this.isShowValidateStatus = true;   
      this.isShowValidatePassword = false;
      this.isShowValidateUsername = false;
      this.isShowValidateTel = false;
      this.isShowValidateAddress = false;
      this.isShowValidateCard = false;
      this.isShowValidateName = false;      
      this.Alert();
    }
    else if(this.datauser.value.addressuser == ""){      
      this.isShowValidateAddress = true;   
      this.isShowValidatePassword = false;
      this.isShowValidateUsername = false;
      this.isShowValidateTel = false;      
      this.isShowValidateCard = false;
      this.isShowValidateName = false;
      this.isShowValidateStatus = false;       
      this.Alert();
    }
    else if(this.datauser.value.carduser == ""){      
      this.isShowValidateCard = true;        
      this.isShowValidatePassword = false;
      this.isShowValidateUsername = false;
      this.isShowValidateTel = false;
      this.isShowValidateAddress = false;      
      this.isShowValidateName = false;
      this.isShowValidateStatus = false;
      this.Alert();
    }
    else if(this.datauser.value.teluser == ""){      
      this.isShowValidateTel = true;      
      this.isShowValidatePassword = false;
      this.isShowValidateUsername = false;      
      this.isShowValidateAddress = false;
      this.isShowValidateCard = false;
      this.isShowValidateName = false;
      this.isShowValidateStatus = false;  
      this.Alert();
    }
    // else if (this.datauser.value.nameuser != "" && this.datauser.value.username != "" && this.datauser.value.password != "" && this.datauser.value.statususer != ""
    // && this.datauser.value.addressuser != "" && this.datauser.value.carduser != "" && this.datauser.value.teluser == "") {      
    //   this.isShowValidate = true;
    // }
    // else if (this.datauser.value.nameuser != "" && this.datauser.value.username != "" && this.datauser.value.password != "" && this.datauser.value.statususer != ""
    // && this.datauser.value.addressuser != "" && this.datauser.value.carduser == "" && this.datauser.value.teluser == "") {      
    //   this.isShowValidate = true;
    // }
    // else if (this.datauser.value.nameuser != "" && this.datauser.value.username != "" && this.datauser.value.password != "" && this.datauser.value.statususer != ""
    // && this.datauser.value.addressuser == "" && this.datauser.value.carduser == "" && this.datauser.value.teluser == "") {      
    //   this.isShowValidate = true;
    // }
    // else if (this.datauser.value.nameuser != "" && this.datauser.value.username != "" && this.datauser.value.password != "" && this.datauser.value.statususer == ""
    // && this.datauser.value.addressuser == "" && this.datauser.value.carduser == "" && this.datauser.value.teluser == "") {      
    //   this.isShowValidate = true;
    // }
    // else if (this.datauser.value.nameuser != "" && this.datauser.value.username != "" && this.datauser.value.password == "" && this.datauser.value.statususer == ""
    // && this.datauser.value.addressuser == "" && this.datauser.value.carduser == "" && this.datauser.value.teluser == "") {      
    //   this.isShowValidate = true;
    // }
    // else if (this.datauser.value.nameuser != "" && this.datauser.value.username == "" && this.datauser.value.password == "" && this.datauser.value.statususer == ""
    // && this.datauser.value.addressuser == "" && this.datauser.value.carduser == "" && this.datauser.value.teluser == "") {      
    //   this.isShowValidate = true;
    // }
    // else if (this.datauser.value.nameuser != "" && this.datauser.value.username != "" && this.datauser.value.password != "" && this.datauser.value.statususer != ""
    // && this.datauser.value.addressuser != "" && this.datauser.value.carduser != "" && this.datauser.value.teluser != "") {      
    //   this.ConfirmInsert();      
    //   this.isShowValidate = false;
    // }

  }

  // ------------------------------------------------------------------------- Insert  

  async ConfirmInsert() {
    const alert = await this.alertController.create({
      message: 'ต้องการที่จะเพิ่มสมาชิกหรือไม่ ?',
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            this.log();
            console.log('Confirm Okay');
          }
        }, {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    await alert.present();
  }

  log() {
    this.submit = true;
    console.log(this.datauser.value);
    console.log(this.datauser);
    this.data = this.datauser.value;
    this.userApi.AddDataUser(this.data).subscribe(it => {
      console.log(it);
    });
    this.route.navigate(['/user']);
  }

  ngOnInit() {
  }

}
