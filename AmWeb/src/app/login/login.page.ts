import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { admin } from 'src/Models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  datauser:FormGroup;
  user:any;
  pass:any;
  data:admin;
  isShowValidate:boolean = false;
  isShowValidateNull:boolean = false;
  public loading;
  
  constructor(public usertApi: UserService,
     public formbuilder: FormBuilder,
      public route: Router,
      private menu: MenuController,
      public loadingCtrl: LoadingController) {   
        
       

        
        


    this.datauser = this.formbuilder.group({
      'user':[null,Validators.required],
      'pass':[null,Validators.required]
    });
   }

 
  ngOnInit() 
  {
    this.usertApi.GetAdminAll().subscribe((it) => {      
      this.data = it; 
      console.log(this.data);      
      this.menu.enable(false);
    });
    //////css//////
 const inputs = document.querySelectorAll(".input");
    function addcl(){
      let parent = this.parentNode.parentNode;
      parent.classList.add("focus");
    }
    
    function remcl(){
      let parent = this.parentNode.parentNode;
      if(this.value == ""){
        parent.classList.remove("focus");
      }
    }
    
    
    inputs.forEach(input => {
      input.addEventListener("focus", addcl);
      input.addEventListener("blur", remcl);
    });
  
    /////////////////
  }
  // Loading(){

  //   this.loadingCtrl.create({
  //     //showBackdrop:false,
  //     message:'555'
  //   }).then((overlay)=>{
  //     this.loading =overlay;
  //     this.loading.present();
  //   });

  //   setTimeout(()=>{

  //     this.loading.dismiss();
  //     this.route.navigate(['/dashbroad']);
      
  //   },4000);

  // }
 
  login(){
    console.log(this.datauser.value);
    console.log(this.data[0].usernameadmin);
    for (let index = 0; index < Object.keys(this.data).length; index++) {
      if (this.data[index].usernameAdmin == this.datauser.value.user && this.datauser.value.pass == this.data[index].passwordAdmin) {
        console.log("true");
        console.log(this.data[index]);
        this.usertApi.statusAdmin = this.data[index].levelAdmin;
        this.usertApi.nameAdmin = this.data[index].nameAdmin;
        this.usertApi.imageAdmin = this.data[index].file;
        console.log(this.usertApi.statusAdmin);
        console.log(this.usertApi.nameAdmin);
        //this.Loading();
       this.route.navigate(['/dashbroad']);
       // window.location.href = ('dashbroad');
       
        
      }
      else if(this.datauser.value.user == null && this.datauser.value.pass == null){
        this.isShowValidateNull = true;
        this.isShowValidate = false;
      }
      else if(this.datauser.value.user != null && this.datauser.value.pass != null){
        this.isShowValidateNull = false;
        this.isShowValidate = true;
      }
      else{        
        console.log("false");
      }
      
    }
    // this.usertApi.checkMenu = true;
  }


  

}

