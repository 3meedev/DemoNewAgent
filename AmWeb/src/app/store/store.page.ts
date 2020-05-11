import { Component, OnInit } from '@angular/core';
import { StoreService } from "src/app/service/store.service";
import { store } from 'src/Models/stroe';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { product } from 'src/Models/product';
import { ProductService } from "src/app/service/product.service";
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  dataStore: FormGroup;
  setdate: string = "2020-02-16T13:51:48.9265091+07:00";
  dataSt: store;
  data;
  datas: product;
  datass: product[] = [];
  datasss: product[] = [];
  // IdclearStore: any;  
  isShow: boolean = false;
  // a;
  datafilter: store[] = [];
  total;
  // sum;  
  // filter: store[] = [];
  public dataStoreAll: store;
  public arr: store[] = [];
  public datashow: store[] = [];
  public chartLabel: string[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  month: string[] = [];
  splitted;
  getmonth: string;
  sumAmountProductInStore: number = 0;
  sumAmountProductSellInStore: number = 0;

  datashowfilter: product[] = [];
  filtertype: store[] = [];  

  isShowCloseTab:boolean = true;
  isShowOpenTab:boolean = true;
  isShowText:boolean = true;
  isShowTextDown:boolean = true;
  PageNumber: number = 1;
  sumProductNumber : number;
  
  
  constructor(private menu: MenuController,
    public api: ProductService,
     public alertController: AlertController,
      public activate: ActivatedRoute,
       public storeApi: StoreService,
        public route: Router,
         public navCtrl: NavController,
          public formbuilder: FormBuilder,) {
    this.dataStore = this.formbuilder.group({
      'idStore': [null, Validators.required],
      'idProduct': [null, Validators.required],
      'nameProduct': [null, Validators.required],
      'unitProduct': [null, Validators.required],
      'unitTotal': [null, Validators.required],
      'sellProduct': [null, Validators.required],
      'total': [null, Validators.required]
    });
  }

  closeTab(){
    this.menu.enable(false);
    this.isShowOpenTab = false;
    this.isShowCloseTab = false;
  }
  openTab(){
    this.menu.enable(true);
    this.isShowOpenTab = true;
    this.isShowCloseTab = true;
  }

  ngOnInit() {
    this.get();
    this.get2();
    this.showall();
  }

  ionViewDidEnter() {
    this.get();
    this.get2();
    this.showall();
    this.sumProductNumber;
    
  }


  public EditStore(id) {
    this.route.navigate(['/edit-store', { _id: id }]);
  }

  // -----------------------------------------------------------------------------

  get2() {
    this.api.GetProductAll().subscribe((it) => {      
      this.datas = it;
      for (let index = 0; index < Object.keys(this.datas).length; index++) {
        this.datass[index] = this.datas[index];
        this.datasss = this.datass;
      }
      if(this.datasss.length == 0){
        this.isShowText = true
      } else {
        this.isShowText = false
      }
    });
  }

  // -------------------------------------------------------------------------------

  get() {
    this.storeApi.GetProductStore().subscribe((it) => {   
      console.log(it);
         
      this.dataStoreAll = it;      
      console.log(this.datafilter.length);
      
      if(this.datafilter.length == 0){
        this.isShowTextDown = true
      } else {
        this.isShowTextDown = false
      }
      for (let index = 0; index < Object.keys(this.dataStoreAll).length; index++) {
        this.datafilter[index] = this.dataStoreAll[index];
        this.total = this.datafilter[index].unitProduct;        
        this.sumProductNumber = Object.keys(this.dataStoreAll).length;       
        
        this.splitted = this.datafilter[index].addProductStore.split("-", 3);        
        this.getmonth = this.splitted[1]
        console.log(this.getmonth);

        // ---------- TEst ----------
        this.splitted = this.setdate.split("-", 3)        
        console.log(this.splitted[1]);        
        
        for (let index = 0; index < Object.keys(this.chartLabel).length; index++) {          
        }
        if (this.getmonth == this.chartLabel[index]) {
          this.api.GetProductAll().subscribe((it) => {            
            this.datas = it;
            for (let index = 0; index < Object.keys(this.datasss).length; index++) {
              // if(this.datasss[index].totalProduct == "0"){
              //   // this.datasss[index].totalProduct = "0";
              //   // this.sumAmountProductInStore = this.sumAmountProductInStore + parseInt(this.datasss[index].totalProduct);
              //   // console.log(this.datasss[index].totalProduct);
                
              // }
              // // this.sumAmountProductInStore = this.datas[index].totalProduct;            
            }            
            for (let index = 0; index < Object.keys(this.datas).length; index++) {
              this.sumAmountProductSellInStore = this.sumAmountProductSellInStore + parseInt(this.datas[index].totalProduct);             
            }
          });
        }       
      }      
    });
    console.log(this.sumAmountProductInStore);    
    console.log(this.datafilter);    
    console.log(this.sumAmountProductSellInStore);    
  }

  // ----------------------------------------------------------------------------------

  public ClearStores(id) {
    // console.log(this.IdclearStore);
    this.storeApi.GetProductStoreByid(id).subscribe(it => {   
      this.dataSt = it      
      this.storeApi.ClearDataStore(id, this.dataSt).subscribe(it => {               
      });
    });
  }

  // --------------------------------------------------------------------------------------

  setShow() {
    if (this.isShow == true) {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  }

  // -----------------------------------------------------------------------------------------

  editlog() {
    this.dataSt = this.dataStore.value
    this.storeApi.EditDataStore(this.dataStoreAll.idProduct, this.dataSt).subscribe(it => {      
    });
    this.route.navigate(['/store']);
  }

  // ------------------------------------------------------------------------------------------

  showall() {
    this.storeApi.GetProductStore().subscribe((it) => {
      this.dataStoreAll = it;      
      for (let index = 0; index < Object.keys(this.dataStoreAll).length; index++) {
        this.datafilter[index] = this.dataStoreAll[index];
        this.filtertype[index] = this.datafilter[index];        
      }
    });
  }
  
  onChange(data) {
    if (data == "ทั้งหมด") {
      this.showall();      
    }
    else {
      this.datafilter = this.filtertype.filter(it =>
        it.idProduct == data)      
    }
  }

  // --------------------------------------------------------------------------

  check() {
    console.log(this.datasss.length);    
    if(this.datasss.length == 0){
      this.alert()
    } else {
      this.route.navigate(['/add-store']);
    }
  }

  async alert() {     
      const alert = await this.alertController.create({        
        message: 'ยังไม่มีรายการสินค้า ต้องการเพิ่มรายการสินค้าหรือไม่ ?',
        buttons: [
          {
            text: 'เพิ่มสินค้า',         
            handler: () => {
              this.route.navigate(['/add-product']);
            }
          }, {
            text: 'ยกเลิก',
            handler: () => {
              
            }
          }
        ]
      });
  
      await alert.present();
    }
  }
  



