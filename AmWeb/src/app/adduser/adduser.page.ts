import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/service/user.service";
import { admin } from 'src/Models/user';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { ProductService } from "src/app/service/product.service";

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.page.html',
  styleUrls: ['./adduser.page.scss'],
})
export class AdduserPage implements OnInit {
  dataadmin: FormGroup;
  submit: boolean = false;
  dataUs: admin;
  
  public dataAdminAll: admin;
  isShowValidateName: boolean = false;
  isShowValidateUsername: boolean = false;
  isShowValidatePassword: boolean = false;
  isShowValidateTel: boolean = false;
  isShowValidateLevel: boolean = false;
  isShowValidateAddress: boolean = false;
  isShowCloseTab: boolean = true;
  isShowOpenTab: boolean = true;
  isShowImage: boolean = false;
  selectedImage: any;
  imageUrl: any;
  image: string;


  
 


  constructor(public api:ProductService,private menu: MenuController, public alertController: AlertController, public userApi: UserService, public route: Router, public navCtrl: NavController, public formbuilder: FormBuilder) {
    this.dataadmin = this.formbuilder.group({
      // 'idadmin': [null, Validators.required],
      'nameadmin': ["", Validators.required],
      'usernameadmin': ["", Validators.required],
      'passwordadmin': ["", Validators.required],
      'teladmin': ["", Validators.compose([Validators.pattern('(^0)([1-9]){2}-([1-9]){3}-([0-9]){4}$'), Validators.required])],
      'leveladmin': ["", Validators.required],
      'addressadmin': ["", Validators.required],
      'file': ["", Validators.required]

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

  // ------------------------------------------------------------------------------------- Validation

  async Alert() {
    const alert = await this.alertController.create({
      message: 'กรุณากรอกข้อมูลให้ครบถ้วน.',
      buttons: ['ตกลง']
    });

    await alert.present();
  }

  public errorMessages = {
    teladmin: [

      { type: 'pattern', message: 'กรุณากรอกเบอร์โทรให้ถูกต้อง 0XX-XXX-XXXX' }
    ],
  };

  get teladmin() {
    return this.dataadmin.get("teladmin");
  }

  check() {
    if (this.dataadmin.value.nameadmin != "" && this.dataadmin.value.usernameadmin != "" && this.dataadmin.value.passwordadmin != "" && this.dataadmin.value.leveladmin != ""
      && this.dataadmin.value.addressadmin != "" && this.dataadmin.value.teladmin != "") {
      this.ConfirmInsert();
      this.isShowValidateName = false;
      this.isShowValidateUsername = false;
      this.isShowValidatePassword = false;
      this.isShowValidateTel = false;
      this.isShowValidateLevel = false;
      this.isShowValidateAddress = false;
    }
    else if (this.dataadmin.value.nameadmin == "") {
      this.isShowValidateName = true;
      this.isShowValidateUsername = false;
      this.isShowValidatePassword = false;
      this.isShowValidateTel = false;
      this.isShowValidateLevel = false;
      this.isShowValidateAddress = false;
      this.Alert();
    }
    else if (this.dataadmin.value.usernameadmin == "") {
      this.isShowValidateName = false;
      this.isShowValidateUsername = true;
      this.isShowValidatePassword = false;
      this.isShowValidateTel = false;
      this.isShowValidateLevel = false;
      this.isShowValidateAddress = false;
      this.Alert();
    }
    else if (this.dataadmin.value.passwordadmin == "") {
      this.isShowValidateName = false;
      this.isShowValidateUsername = false;
      this.isShowValidatePassword = true;
      this.isShowValidateTel = false;
      this.isShowValidateLevel = false;
      this.isShowValidateAddress = false;
      this.Alert();
    }
    else if (this.dataadmin.value.leveladmin == "") {
      this.isShowValidateName = false;
      this.isShowValidateUsername = false;
      this.isShowValidatePassword = false;
      this.isShowValidateTel = false;
      this.isShowValidateLevel = true;
      this.isShowValidateAddress = false;
      this.Alert();
    }
    else if (this.dataadmin.value.addressadmin == "") {
      this.isShowValidateName = false;
      this.isShowValidateUsername = false;
      this.isShowValidatePassword = false;
      this.isShowValidateTel = false;
      this.isShowValidateLevel = false;
      this.isShowValidateAddress = true;
      this.Alert();
    }
    else if (this.dataadmin.value.teladmin == "") {
      this.isShowValidateName = false;
      this.isShowValidateUsername = false;
      this.isShowValidatePassword = false;
      this.isShowValidateTel = true;
      this.isShowValidateLevel = false;
      this.isShowValidateAddress = false;
      this.Alert();
    }
  }

  // ------------------------------------------------------------------------------------- Insert

  get f() { return this.dataadmin.controls; }

  async ConfirmInsert() {
    const alert = await this.alertController.create({
      message: 'ต้องการที่จะเพิ่มผู้ดูแลหรือไม่ ?',
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
    this.dataadmin.value.file = this.api.imageName
    console.log(this.api.imageName);
    
    this.submit = true;
    console.log(this.dataadmin.value.file);
    console.log(this.dataadmin);
    this.dataUs = this.dataadmin.value;
    this.userApi.AddDataAdmin(this.dataUs).subscribe(it => {
      console.log(it);
    });
    this.route.navigate(['/user']);
  }

  ngOnInit() {

  this.userApi.GetAdminAll().subscribe((it) => {
      console.log(it);
      this.dataAdminAll = it;      
      console.log(this.dataAdminAll);
      for (let index = 0; index < Object.keys(this.dataAdminAll).length; index++) {
        console.log(this.dataAdminAll[index].file);       
        
      }
    });
    
    
  }

  imageSelect(event) {

    
    this.selectedImage = event.target.files[0];
    console.log(this.selectedImage);
    

    let reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
     
    };
    
    reader.readAsDataURL(this.selectedImage);
    
  }

}

 

 

