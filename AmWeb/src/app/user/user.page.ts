import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/service/user.service";
import { admin, user } from 'src/Models/user';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { ProductService } from "src/app/service/product.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  public dataAdminAll: admin;
  public dataUserAll: user;
  isShowAdmin: boolean = false;
  isShowUser: boolean = false;
  isShowCloseTab: boolean = true;
  isShowOpenTab: boolean = true;
  isShowText: boolean = true;
  response: { 'dbPath': '' };
  user = {
    "imgPath": ''
  }
  selectedImage: any;
  imageUrl: any;
  a:admin []=[];
  aaa:admin []=[];
  constructor(public api:ProductService,private menu: MenuController, public alertController: AlertController, public activate: ActivatedRoute, public userApi: UserService, public route: Router, public navCtrl: NavController, public formbuilder: FormBuilder) { }



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

  ngOnInit() {
    this.getShowAdmin();
    this.getShowUser();
  }

  ionViewDidEnter() {
    this.getShowAdmin();
    this.getShowUser();
   
  }

  getShowAdmin() {
    this.userApi.GetAdminAll().subscribe((it) => {
      console.log(it);
      this.dataAdminAll = it;      
      console.log(this.dataAdminAll);
      for (let index = 0; index < Object.keys(this.dataAdminAll).length; index++) {
        console.log(this.dataAdminAll[index].file);  
        // this.a[index] =  this.dataAdminAll[index].file
        // this.aaa[index] =  this.dataAdminAll[index].file.split(":");    
        // console.log(this.aaa[index]);
           
      }
     
      
    });
  }


     

  imageSelect() {

    
    // this.selectedImage = this.api.imageName
    console.log(this.api.imageName);
    
    console.log(this.selectedImage);
    

    // let reader = new FileReader();

    // reader.onload = (e: any) => {
    //   this.imageUrl = e.target.result;
     
    // };
    
    // reader.readAsDataURL(this.selectedImage);
    
  }

  getShowUser() {
    this.userApi.GetUserAll().subscribe((it) => {
      console.log(it);
      this.dataUserAll = it;
      console.log(this.dataUserAll);
      if(Object.keys(this.dataUserAll).length == 0){
        this.isShowText = true
      } else {
        this.isShowText = false
      }
    });
  }

  deleteAdmin(idAdmin) {
    this.userApi.DeleteDataAdmin(idAdmin).subscribe(it => {
      this.userApi.GetAdminAll().subscribe((it) => {
        console.log(it);
        this.dataAdminAll = it;   
      });
    });
  }

  public EditDataAdmin(idAdmin) {
    this.route.navigate(['/edit-user', { _id: idAdmin }]);
  }

  public EditDataUser(idUser) {
    this.route.navigate(['/edit-usernotadmin', { _id: idUser }]);
  }

  showcontentAdmin() {
    if (this.isShowAdmin == true) {
      this.isShowAdmin = false;
    } else {
      this.isShowAdmin = true;
    }
  }
  
  showcontentUser() {
    if (this.isShowUser == true) {
      this.isShowUser = false;
    } else {
      this.isShowUser = true;
    }
  }
  deleteUser(idUser) {
    this.userApi.DeleteDataUser(idUser).subscribe(it => {
      this.userApi.GetUserAll().subscribe((it) => {
        console.log(it);
        this.dataUserAll = it;
        console.log(this.dataUserAll);

      });
    });
  }
  async ConfirmDeleteAdmin(idAdmin) {
    const alert = await this.alertController.create({
      message: 'ต้องการที่จะลบข้อมูลผู้ดูแลหรือไม่',
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            this.deleteAdmin(idAdmin);
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

  async ConfirmDeleteUser(idUser) {
    const alert = await this.alertController.create({
      message: 'ต้องการที่จะลบข้อมูลสมาชิกหรือไม่',
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            this.deleteUser(idUser);
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
}
