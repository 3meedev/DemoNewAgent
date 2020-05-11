import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ProductService } from "src/app/service/product.service";
import { StoreService } from "src/app/service/store.service";
import { product } from 'src/Models/product';
import { month } from 'src/Models/month';
import { UserService } from '../service/user.service';
import { MenuController, LoadingController } from '@ionic/angular';
import { OrderService } from '../service/order.service';
import { Order } from 'src/Models/order';
import { receipt } from 'src/Models/order';
import { store } from 'src/Models/stroe';
import { asapScheduler } from 'rxjs';
import { CallApiService } from '../service/call-api.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-dashbroad',
  templateUrl: './dashbroad.page.html',
  styleUrls: ['./dashbroad.page.scss'],
})
export class DashbroadPage implements OnInit {
  netprofitinmonth: number = 0
  total2: number = 0
  total1: number = 0
  totalstock: number = 0
  totalbuyproduct: number = 0;
  expenditure: number = 0;
  filterrevenue: any[] = [];
  yearnow: any = "2020"
  typeChart: any;
  dataChart: any;
  optionsChart: any;
  productAll: product;
  productlabel: product;
  sumAmountProductInStore: number = 0;
  sumAmountProductSellInStore: number = 0;
  sumAmountProductTotalInStore: number = 0;
  isShowCloseTab: boolean = true;
  isShowOpenTab: boolean = true;
  sumSellPerProduct: number[] = [];
  sumSell: number = 0;
  sumCostPerProduct: number[] = [];
  sumCost: number = 0;
  sumTotal: number = 0;
  datafilterrevenue: Order[] = []
  dataorderbydate: Order[] = []

  datastorebydate: store[] = []
  totalsellinmonth: number = 0;

  datarevenueorder: number = 0;
  revenue: number = 0;
  public chartLabel: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public chartproductlabel: product[] = []
  year: any = null
  public chartrevenue: number[] = [];
  public chartDataProductInStore: number[] = [];
  public chartDataProductSellInStore: number[] = [];
  public chartDataProductTotalInStore: number[] = [];
  a: any = 0;
  datenow: Date
  getDataAll: Order[] = [];
  showClose: boolean = false;
  public loading;

  constructor(public callapi: CallApiService,
    public orderApi: OrderService,
    public productApi: ProductService,
    public storeApi: StoreService,
    public UserApi: UserService,
    public menu: MenuController,
    public loadingCtrl: LoadingController,
    private spinner: NgxSpinnerService,
  ) {
    //this.Loading();

    // this.loading2();
    this.showSpinner();

  }


  datareceipt1
  datajson
  dataOrderReceipt: Order[] = []
  dataorderarray: Order[] = []
  datareceipt: receipt[] = []
  dataOrederr
  dataorder1
  dataorder2: Order
  dataorder3: number = 0
  /////////////////////////////////

  Loading() {

  }

  sumrevenue() {
    this.callapi.GetReceiptAll().subscribe(it => {
      this.dataOrederr = it
      this.dataorderarray = []
      this.dataOrderReceipt = []
      this.datarevenueorder = 0
      this.totalsellinmonth = 0
      for (let index = 0; index < Object.keys(this.dataOrederr).length; index++) {
        this.datareceipt[index] = this.dataOrederr[index]
        this.datajson = this.datareceipt[index].dataOrder
        // this.dataorderarray.push(this.datajson)
        console.log(this.dataorderarray);
      }
      for (let index = 0; index < this.dataorderarray.length; index++) {
        var data = Object.values(this.dataorderarray[index])
        for (let x = 0; x < data.length; x++) {
          this.datareceipt1 = data[x]
          this.dataOrderReceipt.push(this.datareceipt1)
          console.log(this.dataOrderReceipt);
        }
      }
      this.dataorder1 = this.dataOrderReceipt
      this.dataorder2 = this.dataorder1
      for (let a = 0; a < Object.keys(this.dataorder2).length; a++) {
        this.datarevenueorder = this.datarevenueorder + parseInt(this.dataorder2[a].priceOrder)
      }
      for (let a = 0; a < Object.keys(this.dataorder2).length; a++) {
        this.totalsellinmonth = this.totalsellinmonth + parseInt(this.dataorder2[a].amountProduct)
        this.testsell = this.totalsellinmonth
        console.log(this.dataorder2[a].amountProduct);

      }
      console.log(this.datarevenueorder);
      console.log(this.totalsellinmonth);
    })
  }


  /////////////////////////////////
  ngOnInit() {
    this.getyearnow();
    this.openChart();
    this.productGetAll();
    this.getnameproduct();
    this.getdataorderall()
    this.showrevennue();
    this.getalldatastore();
    this.showexpenditure();
    this.totalstockinmonth();
    this.sumrevenue();
    this.netprofit();
    //this.loading2();



  }
  showSpinner() {
    this.spinner.show();
    this.menu.close('main');
    setTimeout(() => {
      this.spinner.hide();
     // this.menu.open('main');
      this.ngOnInit();
      this.ionViewWillEnter();

    }, 3000);
  }



  loading2() {
    window.addEventListener('load', function load() {
      const loader = document.getElementById('sk-cube-grid');
      setTimeout(function () {
        loader.classList.add('fadeOut');
      }, 300);
    });
  }
  ionViewWillEnter() {
    this.loading2();
    this.getyearnow();
    this.openChart();
    this.productGetAll();
    this.getnameproduct();
    this.getdataorderall()
    this.showrevennue();
    this.getalldatastore();
    this.showexpenditure();
    this.totalstockinmonth();
    this.sumrevenue();
    this.netprofit();

    this.menu.enable(true);



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
  goback() {
    console.log(5555);

  }

  // events on slice click
  public chartClicked(e: any): void {
    console.log(e);
  }
  // event on pie chart slice hover
  public chartHovered(e: any): void {
    console.log(e);
  }
  /////////////////////////////////////labelproductname////////////////////////////////////////////
  getnameproduct() {
    this.productApi.GetProductAll().subscribe(it => {
      this.productlabel = it
      for (let index = 0; index < Object.keys(this.productlabel).length; index++) {
        this.chartproductlabel[index] = this.productlabel[index].nameProduct
        console.log(this.chartproductlabel[index]);
      }
    })
  }

  ///////////////////////////////////////store////////////////////////////////////////////////////

  getalldatastore() {
    this.storeApi.GetProductStore().subscribe(it => {

      for (let index = 0; index < Object.keys(it).length; index++) {
        this.datastorebydate[index] = it[index]
      }

    })
    this.dataexpenditure()
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////



  //////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////order////////////////////////////////////////////////
  getdataorderall() {
    this.orderApi.GetListAllProduct().subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.dataorderbydate[index] = it[index]
      }
      console.log(this.dataorderbydate);
      this.datarevenue();
    })
  }
  onChangyear(data) {
    this.year = data
    this.yearnow = data
    console.log(this.year);
    console.log(this.yearnow);

  }
  testsell: number = 0
  onChange(data) {
    if (data == "ทั้งหมด") {
      this.datastorebydate = [];
      this.dataorderbydate = [];
      this.totalstock = 0
      this.dataorderarray = []
      this.dataOrderReceipt = []
      this.datarevenueorder = 0
      this.totalsellinmonth = 0
      this.testsell = 0
      this.orderApi.getReceiptallyear(this.year).subscribe(it => {
        this.dataOrederr = it
        for (let index = 0; index < Object.keys(this.dataOrederr).length; index++) {
          this.datareceipt[index] = this.dataOrederr[index]
          this.datajson = this.datareceipt[index].dataOrder
          this.dataorderarray.push(this.datajson)
        }
        for (let index = 0; index < this.dataorderarray.length; index++) {
          var data = Object.values(this.dataorderarray[index])
          for (let x = 0; x < data.length; x++) {
            this.datareceipt1 = data[x]
            this.dataOrderReceipt.push(this.datareceipt1)
            console.log(this.dataOrderReceipt);
          }
        }
        this.dataorder1 = this.dataOrderReceipt
        this.dataorder2 = this.dataorder1
        for (let a = 0; a < Object.keys(this.dataorder2).length; a++) {
          this.datarevenueorder = this.datarevenueorder + parseInt(this.dataorder2[a].priceOrder)
        }
        for (let a = 0; a < Object.keys(this.dataorder2).length; a++) {
          this.totalsellinmonth = this.totalsellinmonth + parseInt(this.dataorder2[a].amountProduct)
          this.testsell = this.totalsellinmonth
          console.log(this.dataorder2[a].amountProduct);

        }
        console.log(this.datarevenueorder);
        console.log(this.totalsellinmonth);
        this.datarevenue();
        this.totalstockinmonth()
        this.netprofit()

      })
      this.storeApi.getproductallyear(this.year).subscribe(it => {
        for (let index = 0; index < Object.keys(it).length; index++) {
          this.datastorebydate[index] = it[index]
        }
        this.dataexpenditure()
        this.totalstockinmonth()
        this.netprofit()
      })
    }

    else {
      this.datastorebydate = [];
      this.dataorderbydate = [];
      this.totalstock = 0
      this.dataorderarray = []
      this.dataOrderReceipt = []
      this.datarevenueorder = 0
      this.totalsellinmonth = 0
      this.testsell = 0
      this.orderApi.getReceiptlistbydateyear(this.year, data).subscribe(it => {
        this.dataOrederr = it
        for (let index = 0; index < Object.keys(this.dataOrederr).length; index++) {
          this.datareceipt[index] = this.dataOrederr[index]
          this.datajson = this.datareceipt[index].dataOrder
          this.dataorderarray.push(this.datajson)
        }
        for (let index = 0; index < this.dataorderarray.length; index++) {
          var data = Object.values(this.dataorderarray[index])
          for (let x = 0; x < data.length; x++) {
            this.datareceipt1 = data[x]
            this.dataOrderReceipt.push(this.datareceipt1)
            console.log(this.dataOrderReceipt);
          }
        }
        this.dataorder1 = this.dataOrderReceipt
        this.dataorder2 = this.dataorder1
        for (let a = 0; a < Object.keys(this.dataorder2).length; a++) {
          this.datarevenueorder = this.datarevenueorder + parseInt(this.dataorder2[a].priceOrder)
        }
        for (let a = 0; a < Object.keys(this.dataorder2).length; a++) {
          this.totalsellinmonth = this.totalsellinmonth + parseInt(this.dataorder2[a].amountProduct)
          this.testsell = this.totalsellinmonth
          console.log(this.dataorder2[a].amountProduct);
        }
        console.log(this.datarevenueorder);
        console.log(this.totalsellinmonth);
        this.datarevenue();
        this.totalstockinmonth()
        this.netprofit()

      })
      this.storeApi.getproductlistbydateyear(this.year, data).subscribe(it => {
        for (let index = 0; index < Object.keys(it).length; index++) {
          this.datastorebydate[index] = it[index]
        }
        this.dataexpenditure()
        this.totalstockinmonth()
        this.netprofit()
      })

    }


  }

  dataexpenditure() {
    this.expenditure = 0
    for (let index = 0; index < Object.keys(this.datastorebydate).length; index++) {
      this.expenditure = this.expenditure + parseInt(this.datastorebydate[index].costProduct)

    }
    this.totalbuyinmonth()
    // console.log("รายจ่าย = " + this.expenditure);
  }
  totalbuyinmonth() {
    this.total1 = 0
    this.totalbuyproduct = 0
    for (let index = 0; index < Object.keys(this.datastorebydate).length; index++) {
      this.totalbuyproduct = this.totalbuyproduct + parseInt(this.datastorebydate[index].totalProduct)
      this.total1 = this.totalbuyproduct
    }
    // console.log("นำเข้า = " + this.total1);
  }
  datarevenue() {
    this.revenue = 0;
    for (let index = 0; index < Object.keys(this.dataorderbydate).length; index++) {
      this.revenue = this.revenue + parseInt(this.dataorderbydate[index].priceOrder);
      console.log(this.dataorderbydate[index].priceOrder);
    }
    // console.log("รายรับ = "+this.revenue);
    this.selltotalinmonth();
  }
  selltotalinmonth() {
    this.total2 = 0
    this.totalsellinmonth = 0;
    for (let index = 0; index < Object.keys(this.dataorderbydate).length; index++) {
      this.totalsellinmonth = this.totalsellinmonth + parseInt(this.dataorderbydate[index].amountProduct)
      this.total2 = this.totalsellinmonth
    }
    // console.log("ขายออก = " + this.total2);

  }

  netprofit() {
    this.netprofitinmonth = this.datarevenueorder - this.expenditure
  }


  totalstockinmonth() {

    this.totalstock = 0

    this.totalstock = this.total1 - this.testsell
    console.log(this.totalstock);



  }
  getyearnow() {
    this.datenow = new Date()
    this.yearnow = this.datenow.getFullYear().toString()
    console.log(this.yearnow);
  }



  //////////////////////////////////////////////////////////////////////////////////////////////////////////


  //////////////////////////////////////////variableexpenditure////////////////////////////////////////////////
  janexpenditure: store[] = []
  febexpenditure: store[] = []
  marexpenditure: store[] = []
  aprilexpenditure: store[] = []
  mayexpenditure: store[] = []
  juneexpenditure: store[] = []
  julyexpenditure: store[] = []
  augexpenditure: store[] = []
  septemberexpenditure: store[] = []
  octexpenditure: store[] = []
  novemberexpenditure: store[] = []
  decemberexpenditure: store[] = []
  expenditurejan = 0
  expenditurefeb = 0
  expendituremar = 0
  expenditureapril = 0
  expendituremay = 0
  expenditurejune = 0
  expenditurejuly = 0
  expenditureaug = 0
  expenditureseptember = 0
  expenditureoct = 0
  expenditurenovember = 0
  expendituredecember = 0
  ////////////////////////////////////////////showexpenditure///////////////////////////
  showexpenditure() {
    this.getproductjan();
    this.getproductfeb();
    this.getproductmar();
    this.getproductapril();
    this.getproductmay();
    this.getproductjune();
    this.getproductjuly();
    this.getproductaug();
    this.getproductseptember();
    this.getproductoct();
    this.getproductnovember();
    this.getproductdecember();
  }
  ///////////////////////////////////////////////expenditure/////////////////////////////////////////////
  getproductjan() {

    this.storeApi.getproductlistbydateyear(this.yearnow, "1").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.janexpenditure[index] = it[index]
      }
      console.log(this.janexpenditure);
      this.dataproductjan()
    })
  }
  dataproductjan() {
    this.expenditurejan = 0
    for (let index = 0; index < Object.keys(this.janexpenditure).length; index++) {
      this.expenditurejan = this.expenditurejan + parseInt(this.janexpenditure[index].costProduct);

    }
    console.log(this.expenditurejan);

  }
  getproductfeb() {

    this.storeApi.getproductlistbydateyear(this.yearnow, "2").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.febexpenditure[index] = it[index]
      }
      console.log(this.febexpenditure);
      this.dataproductfeb()
    })
  }
  dataproductfeb() {
    this.expenditurefeb = 0
    for (let index = 0; index < Object.keys(this.febexpenditure).length; index++) {
      this.expenditurefeb = this.expenditurefeb + parseInt(this.febexpenditure[index].costProduct);

    }
    console.log(this.febexpenditure);

  }
  getproductmar() {
    this.storeApi.getproductlistbydateyear(this.yearnow, "3").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.marexpenditure[index] = it[index]
      }
      console.log(this.marexpenditure);
      this.dataproductmar()
    })
  }
  dataproductmar() {
    this.expendituremar = 0
    for (let index = 0; index < Object.keys(this.marexpenditure).length; index++) {
      this.expendituremar = this.expendituremar + parseInt(this.marexpenditure[index].costProduct);
    }
    console.log(this.expendituremar);

  }
  getproductapril() {
    this.storeApi.getproductlistbydateyear(this.yearnow, "4").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.aprilexpenditure[index] = it[index]
      }
      console.log(this.aprilexpenditure);
      this.dataproductapril()
    })
  }
  dataproductapril() {
    this.expenditureapril = 0
    for (let index = 0; index < Object.keys(this.aprilexpenditure).length; index++) {
      this.expenditureapril = this.expenditureapril + parseInt(this.aprilexpenditure[index].costProduct);
    }
    console.log(this.expenditureapril);

  }
  getproductmay() {
    this.storeApi.getproductlistbydateyear(this.yearnow, "5").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.mayexpenditure[index] = it[index]
      }
      console.log(this.mayexpenditure);
      this.dataproductmay()
    })
  }
  dataproductmay() {
    this.expendituremay = 0
    for (let index = 0; index < Object.keys(this.mayexpenditure).length; index++) {
      this.expendituremay = this.expendituremay + parseInt(this.mayexpenditure[index].costProduct);
    }
    console.log(this.expendituremay);

  }
  getproductjune() {
    this.storeApi.getproductlistbydateyear(this.yearnow, "6").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.juneexpenditure[index] = it[index]
      }
      console.log(this.juneexpenditure);
      this.dataproductjune()
    })
  }
  dataproductjune() {
    this.expenditurejune = 0
    for (let index = 0; index < Object.keys(this.juneexpenditure).length; index++) {
      this.expenditurejune = this.expenditurejune + parseInt(this.juneexpenditure[index].costProduct);
    }
    console.log(this.expenditurejune);

  }
  getproductjuly() {
    this.storeApi.getproductlistbydateyear(this.yearnow, "7").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.julyexpenditure[index] = it[index]
      }
      console.log(this.juneexpenditure);
      this.dataproductjuly()
    })
  }
  dataproductjuly() {
    this.expenditurejuly = 0
    for (let index = 0; index < Object.keys(this.julyexpenditure).length; index++) {
      this.expenditurejuly = this.expenditurejuly + parseInt(this.julyexpenditure[index].costProduct);
    }
    console.log(this.expenditurejuly);

  }
  getproductaug() {
    this.storeApi.getproductlistbydateyear(this.yearnow, "8").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.augexpenditure[index] = it[index]
      }
      console.log(this.augexpenditure);
      this.dataproductaug()
    })
  }
  dataproductaug() {
    this.expenditureaug = 0
    for (let index = 0; index < Object.keys(this.augexpenditure).length; index++) {
      this.expenditureaug = this.expenditureaug + parseInt(this.augexpenditure[index].costProduct);
    }
    console.log(this.expenditureaug);
  }
  getproductseptember() {
    this.storeApi.getproductlistbydateyear(this.yearnow, "9").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.septemberexpenditure[index] = it[index]
      }
      console.log(this.septemberexpenditure);
      this.dataproductseptember()
    })
  }
  dataproductseptember() {
    this.expenditureseptember = 0
    for (let index = 0; index < Object.keys(this.septemberexpenditure).length; index++) {
      this.expenditureseptember = this.expenditureseptember + parseInt(this.septemberexpenditure[index].costProduct);
    }
    console.log(this.expenditureaug);

  }
  getproductoct() {
    this.storeApi.getproductlistbydateyear(this.yearnow, "10").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.octexpenditure[index] = it[index]
      }
      console.log(this.octexpenditure);
      this.dataproductoct()
    })
  }
  dataproductoct() {
    this.expenditureoct = 0
    for (let index = 0; index < Object.keys(this.octexpenditure).length; index++) {
      this.expenditureoct = this.expenditureoct + parseInt(this.octexpenditure[index].costProduct);
    }
    console.log(this.expenditureaug);

  }
  getproductnovember() {
    this.storeApi.getproductlistbydateyear(this.yearnow, "11").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.novemberexpenditure[index] = it[index]
      }
      console.log(this.novemberexpenditure);
      this.dataproductnovember()
    })
  }
  dataproductnovember() {
    this.expenditurenovember = 0
    for (let index = 0; index < Object.keys(this.novemberexpenditure).length; index++) {
      this.expenditurenovember = this.expenditurenovember + parseInt(this.novemberexpenditure[index].costProduct);
    }
    console.log(this.expenditureaug);

  }
  getproductdecember() {
    this.storeApi.getproductlistbydateyear(this.yearnow, "12").subscribe(it => {
      for (let index = 0; index < Object.keys(it).length; index++) {
        this.decemberexpenditure[index] = it[index]
      }
      console.log(this.decemberexpenditure);
      this.dataproductdecember()
    })
  }
  dataproductdecember() {
    this.expendituredecember = 0
    for (let index = 0; index < Object.keys(this.decemberexpenditure).length; index++) {
      this.expendituredecember = this.expendituredecember + parseInt(this.decemberexpenditure[index].costProduct);
    }
    console.log(this.expendituredecember);

  }


  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////variablerevenue/////////////////////////////////////////

  janrevenue: Order[] = []
  febrevenue: Order[] = []
  marrevenue: Order[] = []
  aprilrevenue: Order[] = []
  mayrevenue: Order[] = []
  junerevenue: Order[] = []
  julyrevenue: Order[] = []
  augrevenue: Order[] = []
  septemberrevenue: Order[] = []
  octrevenue: Order[] = []
  novemberrevenue: Order[] = []
  decemberrevenue: Order[] = []
  revenuejan = 0
  revenuefeb = 0
  revenuemar = 0
  revenueapril = 0
  revenuemay = 0
  revenuejune = 0
  revenuejuly = 0
  revenueaug = 0
  revenueseptember = 0
  revenueoct = 0
  revenuenovember = 0
  revenuedecem = 0

  /////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////showrevennue///////////////////////////////////////
  showrevennue() {
    this.getOrderjan();
    this.getOrderfeb();
    this.getOrdermar();
    this.getOrderapril();
    this.getOrdermay();
    this.getOrderjune();
    this.getOrderjuly();
    this.getOrderaug();
    this.getOrderseptember();
    this.getOrderoct();
    this.getOrdernovember();
    this.getOrderdecem();
  }

  /////////////////////////////////////////monthrevenue////////////////////////////////////////////



  dataorderarrayjan: Order[] = []
  getOrderjan() {
    this.dataorderarrayjan = []
    this.janrevenue = []
    this.orderApi.getReceiptlistbydateyear(this.yearnow, "1").subscribe(it => {
      this.dataOrederr = it
      for (let index = 0; index < Object.keys(this.dataOrederr).length; index++) {
        this.datareceipt[index] = this.dataOrederr[index]
        this.datajson = this.datareceipt[index].dataOrder
        this.dataorderarrayjan.push(this.datajson)
      }
      for (let index = 0; index < this.dataorderarrayjan.length; index++) {
        var data = Object.values(this.dataorderarrayjan[index])
        for (let x = 0; x < data.length; x++) {
          this.datareceipt1 = data[x]
          this.janrevenue.push(this.datareceipt1)
        }
      }
      this.datarevenueinmonth()
    })
  }
  datarevenueinmonth() {
    this.revenuejan = 0
    for (let index = 0; index < Object.keys(this.janrevenue).length; index++) {
      this.revenuejan = this.revenuejan + parseInt(this.janrevenue[index].priceOrder);
      console.log(this.janrevenue[index].priceOrder);
    }
    console.log(this.revenuejan);

  }

  check() {
    this.getOrdermar()
  }

  dataorderarrayfeb: Order[] = []
  getOrderfeb() {

    this.orderApi.getReceiptlistbydateyear(this.yearnow, "2").subscribe(it => {
      this.dataorderarrayfeb = []
      this.febrevenue = []
      this.dataOrederr = it
      for (let index = 0; index < Object.keys(this.dataOrederr).length; index++) {
        this.datareceipt[index] = this.dataOrederr[index]
        this.datajson = this.datareceipt[index].dataOrder
        this.dataorderarrayfeb.push(this.datajson)
      }
      for (let index = 0; index < this.dataorderarrayfeb.length; index++) {
        var data = Object.values(this.dataorderarrayfeb[index])
        for (let x = 0; x < data.length; x++) {
          this.datareceipt1 = data[x]
          this.febrevenue.push(this.datareceipt1)
        }
      }
      console.log(this.febrevenue);
      this.datarevenueinfeb()
    })
  }
  datarevenueinfeb() {
    this.revenuefeb = 0
    for (let index = 0; index < Object.keys(this.febrevenue).length; index++) {
      this.revenuefeb = this.revenuefeb + parseInt(this.febrevenue[index].priceOrder);
      console.log(this.febrevenue[index].priceOrder);
    }
    console.log(this.revenuefeb);

  }
  dataorderarraymar: Order[] = []
  getOrdermar() {
    this.dataorderarraymar = []
    this.marrevenue = []
    this.orderApi.getReceiptlistbydateyear(this.yearnow, "3").subscribe(it => {
      this.dataOrederr = it
      console.log(it);
      for (let index = 0; index < Object.keys(this.dataOrederr).length; index++) {
        this.datareceipt[index] = this.dataOrederr[index]
        this.datajson = this.datareceipt[index].dataOrder
        this.dataorderarraymar.push(this.datajson)
      }
      for (let index = 0; index < this.dataorderarraymar.length; index++) {
        var data = Object.values(this.dataorderarraymar[index])
        for (let x = 0; x < data.length; x++) {
          this.datareceipt1 = data[x]
          this.marrevenue.push(this.datareceipt1)
        }
      }
      this.datarevenueinmar()
    })
  }
  datarevenueinmar() {
    this.revenuemar = 0
    for (let index = 0; index < Object.keys(this.marrevenue).length; index++) {
      this.revenuemar = this.revenuemar + parseInt(this.marrevenue[index].priceOrder);
      console.log(this.marrevenue[index].priceOrder);
    }
    console.log(this.revenuemar);

  }
  dataorderarrayapril: Order[] = []
  getOrderapril() {
    this.dataorderarrayapril = []
    this.aprilrevenue = []
    this.orderApi.getReceiptlistbydateyear(this.yearnow, "4").subscribe(it => {
      this.dataOrederr = it
      console.log(it);
      for (let index = 0; index < Object.keys(this.dataOrederr).length; index++) {
        this.datareceipt[index] = this.dataOrederr[index]
        this.datajson = this.datareceipt[index].dataOrder
        this.dataorderarrayapril.push(this.datajson)
      }
      for (let index = 0; index < this.dataorderarrayapril.length; index++) {
        var data = Object.values(this.dataorderarrayapril[index])
        for (let x = 0; x < data.length; x++) {
          this.datareceipt1 = data[x]
          this.aprilrevenue.push(this.datareceipt1)
        }
      }
      this.datarevenueinapril()
    })
  }
  datarevenueinapril() {
    this.revenueapril = 0
    for (let index = 0; index < Object.keys(this.aprilrevenue).length; index++) {
      this.revenueapril = this.revenueapril + parseInt(this.aprilrevenue[index].priceOrder);
    }

  }
  dataorderarraymay: Order[] = []
  getOrdermay() {
    this.dataorderarraymay = []
    this.mayrevenue = []
    this.orderApi.getReceiptlistbydateyear(this.yearnow, "5").subscribe(it => {
      this.dataOrederr = it
      console.log(it);
      for (let index = 0; index < Object.keys(this.dataOrederr).length; index++) {
        this.datareceipt[index] = this.dataOrederr[index]
        this.datajson = this.datareceipt[index].dataOrder
        this.dataorderarraymay.push(this.datajson)
      }
      for (let index = 0; index < this.dataorderarraymay.length; index++) {
        var data = Object.values(this.dataorderarraymay[index])
        for (let x = 0; x < data.length; x++) {
          this.datareceipt1 = data[x]
          this.mayrevenue.push(this.datareceipt1)
        }
      }
      this.datarevenueinmay()
      console.log(it);
    })
  }
  datarevenueinmay() {
    this.revenuemay = 0
    for (let index = 0; index < Object.keys(this.mayrevenue).length; index++) {
      this.revenuemay = this.revenuemay + parseInt(this.mayrevenue[index].priceOrder);
    }

  }
  dataorderarrayjune: Order[] = []
  getOrderjune() {
    this.dataorderarrayjune = []
    this.junerevenue = []
    this.orderApi.getReceiptlistbydateyear(this.yearnow, "6").subscribe(it => {
      this.dataOrederr = it
      console.log(it);
      for (let index = 0; index < Object.keys(this.dataOrederr).length; index++) {
        this.datareceipt[index] = this.dataOrederr[index]
        this.datajson = this.datareceipt[index].dataOrder
        this.dataorderarrayjune.push(this.datajson)
      }
      for (let index = 0; index < this.dataorderarrayjune.length; index++) {
        var data = Object.values(this.dataorderarrayjune[index])
        for (let x = 0; x < data.length; x++) {
          this.datareceipt1 = data[x]
          this.junerevenue.push(this.datareceipt1)
        }
      }
      this.datarevenueinjune()
      console.log(it);

    })
  }
  datarevenueinjune() {
    this.revenuejune = 0
    for (let index = 0; index < Object.keys(this.junerevenue).length; index++) {
      this.revenuejune = this.revenuejune + parseInt(this.junerevenue[index].priceOrder);
    }

  }
  dataorderarrayjuly: Order[] = []
  getOrderjuly() {
    this.dataorderarrayjuly = []
    this.julyrevenue = []
    this.orderApi.getReceiptlistbydateyear(this.yearnow, "7").subscribe(it => {
      this.dataOrederr = it
      console.log(it);
      for (let index = 0; index < Object.keys(this.dataOrederr).length; index++) {
        this.datareceipt[index] = this.dataOrederr[index]
        this.datajson = this.datareceipt[index].dataOrder
        this.dataorderarrayjuly.push(this.datajson)
      }
      for (let index = 0; index < this.dataorderarrayjuly.length; index++) {
        var data = Object.values(this.dataorderarrayjuly[index])
        for (let x = 0; x < data.length; x++) {
          this.datareceipt1 = data[x]
          this.julyrevenue.push(this.datareceipt1)
        }
      }
      this.datarevenueinjuly()
      console.log(it);

    })
  }
  datarevenueinjuly() {
    this.revenuejuly = 0
    for (let index = 0; index < Object.keys(this.julyrevenue).length; index++) {
      this.revenuejuly = this.revenuejuly + parseInt(this.julyrevenue[index].priceOrder);
    }

  }
  dataorderarrayaug: Order[] = []
  getOrderaug() {
    this.dataorderarrayaug = []
    this.augrevenue = []
    this.orderApi.getReceiptlistbydateyear(this.yearnow, "8").subscribe(it => {

      this.dataOrederr = it
      console.log(it);
      for (let index = 0; index < Object.keys(this.dataOrederr).length; index++) {
        this.datareceipt[index] = this.dataOrederr[index]
        this.datajson = this.datareceipt[index].dataOrder
        this.dataorderarrayaug.push(this.datajson)
      }
      for (let index = 0; index < this.dataorderarrayaug.length; index++) {
        var data = Object.values(this.dataorderarrayaug[index])
        for (let x = 0; x < data.length; x++) {
          this.datareceipt1 = data[x]
          this.augrevenue.push(this.datareceipt1)
        }
      }
      this.datarevenueinaug()
      console.log(it);
    })
  }
  datarevenueinaug() {
    this.revenueaug = 0
    for (let index = 0; index < Object.keys(this.augrevenue).length; index++) {
      this.revenueaug = this.revenueaug + parseInt(this.augrevenue[index].priceOrder);
    }

  }
  dataorderarrayseptember: Order[] = []
  getOrderseptember() {
    this.dataorderarrayseptember = []
    this.septemberrevenue = []
    this.orderApi.getReceiptlistbydateyear(this.yearnow, "9").subscribe(it => {
      this.dataOrederr = it
      for (let index = 0; index < Object.keys(this.dataOrederr).length; index++) {
        this.datareceipt[index] = this.dataOrederr[index]
        this.datajson = this.datareceipt[index].dataOrder
        this.dataorderarrayseptember.push(this.datajson)
      }
      for (let index = 0; index < this.dataorderarrayseptember.length; index++) {
        var data = Object.values(this.dataorderarrayseptember[index])
        for (let x = 0; x < data.length; x++) {
          this.datareceipt1 = data[x]
          this.septemberrevenue.push(this.datareceipt1)
        }
      }
      this.datarevenueinseptemberrevenue()
      console.log(it);
    })
  }
  datarevenueinseptemberrevenue() {
    this.revenueseptember = 0
    for (let index = 0; index < Object.keys(this.septemberrevenue).length; index++) {
      this.revenueseptember = this.revenueseptember + parseInt(this.septemberrevenue[index].priceOrder);
    }

  }
  dataorderarrayoct: Order[] = []
  getOrderoct() {
    this.orderApi.getReceiptlistbydateyear(this.yearnow, "10").subscribe(it => {
      this.dataorderarrayoct = []
      this.octrevenue = []
      this.dataOrederr = it
      for (let index = 0; index < Object.keys(this.dataOrederr).length; index++) {
        this.datareceipt[index] = this.dataOrederr[index]
        this.datajson = this.datareceipt[index].dataOrder
        this.dataorderarrayoct.push(this.datajson)
      }
      for (let index = 0; index < this.dataorderarrayoct.length; index++) {
        var data = Object.values(this.dataorderarrayoct[index])
        for (let x = 0; x < data.length; x++) {
          this.datareceipt1 = data[x]
          this.octrevenue.push(this.datareceipt1)
        }
      }
      this.datarevenueoct()
      console.log(it);
    })
  }
  datarevenueoct() {
    this.revenueoct = 0
    for (let index = 0; index < Object.keys(this.octrevenue).length; index++) {
      this.revenueoct = this.revenueoct + parseInt(this.octrevenue[index].priceOrder);
    }
  }
  dataorderarraynovember: Order[] = []
  getOrdernovember() {
    this.orderApi.getReceiptlistbydateyear(this.yearnow, "11").subscribe(it => {
      this.dataorderarraynovember = []
      this.novemberrevenue = []
      this.dataOrederr = it
      for (let index = 0; index < Object.keys(this.dataOrederr).length; index++) {
        this.datareceipt[index] = this.dataOrederr[index]
        this.datajson = this.datareceipt[index].dataOrder
        this.dataorderarraynovember.push(this.datajson)
      }
      for (let index = 0; index < this.dataorderarraynovember.length; index++) {
        var data = Object.values(this.dataorderarraynovember[index])
        for (let x = 0; x < data.length; x++) {
          this.datareceipt1 = data[x]
          this.novemberrevenue.push(this.datareceipt1)
        }
      }
      this.datarevenuenovember()
      console.log(it);
    })
  }
  datarevenuenovember() {
    this.revenuenovember = 0
    for (let index = 0; index < Object.keys(this.novemberrevenue).length; index++) {
      this.revenuenovember = this.revenuenovember + parseInt(this.novemberrevenue[index].priceOrder);
    }

  }
  dataorderarraydecem: Order[] = []
  getOrderdecem() {

    this.orderApi.getReceiptlistbydateyear(this.yearnow, "12").subscribe(it => {
      this.dataorderarraydecem = []
      this.decemberrevenue = []
      this.dataOrederr = it
      for (let index = 0; index < Object.keys(this.dataOrederr).length; index++) {
        this.datareceipt[index] = this.dataOrederr[index]
        this.datajson = this.datareceipt[index].dataOrder
        this.dataorderarraydecem.push(this.datajson)
      }
      for (let index = 0; index < this.dataorderarraydecem.length; index++) {
        var data = Object.values(this.dataorderarraydecem[index])
        for (let x = 0; x < data.length; x++) {
          this.datareceipt1 = data[x]
          this.decemberrevenue.push(this.datareceipt1)
        }
      }
      this.datarevenuedecem()
      console.log(it);
    })
  }
  datarevenuedecem() {
    this.revenuedecem = 0
    for (let index = 0; index < Object.keys(this.decemberrevenue).length; index++) {
      this.revenuedecem = this.revenuedecem + parseInt(this.decemberrevenue[index].priceOrder);
    }

  }







  //////////////////////////////////////////////////////////////////////////////////////////

  productGetAll() {
    this.productApi.GetProductAll().subscribe(it => {
      // console.log(it);
      this.productAll = it;
      console.log(this.productAll);
      this.sumAmountProductInStore = 0;
      for (let index = 0; index < Object.keys(this.productAll).length; index++) {
        this.sumAmountProductInStore = this.sumAmountProductInStore + parseInt(this.productAll[index].total);
        console.log(this.sumAmountProductInStore);
      }
      for (let index = 0; index < Object.keys(this.productAll).length; index++) {
        this.sumAmountProductSellInStore = this.sumAmountProductSellInStore + parseInt(this.productAll[index].amountProduct);
        console.log(this.sumAmountProductSellInStore);
      }
      for (let index = 0; index < Object.keys(this.productAll).length; index++) {
        this.sumAmountProductTotalInStore = this.sumAmountProductTotalInStore + parseInt(this.productAll[index].totalProduct);
        console.log(this.sumAmountProductTotalInStore);
      }
      for (let index = 0; index < Object.keys(this.productAll).length; index++) {
        this.sumSellPerProduct[index] = parseInt(this.productAll[index].priceProduct) * parseInt(this.productAll[index].amountProduct);
        console.log(this.sumSellPerProduct);
      }
      for (let index = 0; index < Object.keys(this.productAll).length; index++) {
        this.sumSell = this.sumSell + this.sumSellPerProduct[index];
        console.log(this.sumSell);
      }
      for (let index = 0; index < Object.keys(this.productAll).length; index++) {
        this.sumCostPerProduct[index] = parseInt(this.productAll[index].costProduct) * parseInt(this.productAll[index].amountProduct);
        console.log(this.sumCostPerProduct);
      }
      for (let index = 0; index < Object.keys(this.productAll).length; index++) {
        this.sumCost = this.sumCost + this.sumCostPerProduct[index];
        console.log(this.sumCost);
      }
      this.sumTotal = this.sumSell - this.sumCost;

      // -------------------- Chart --------------------

      for (let index = 0; index < Object.keys(this.productAll).length; index++) {
        this.productApi.chartDataProductInStore[index] = this.productAll[index].total;
      }
      console.log(this.productApi.chartDataProductInStore);

      for (let index = 0; index < Object.keys(this.productAll).length; index++) {
        this.productApi.chartDataProductSellInStore[index] = this.productAll[index].amountProduct;
      }
      console.log(this.productApi.chartDataProductSellInStore);

      for (let index = 0; index < Object.keys(this.productAll).length; index++) {
        this.productApi.chartDataProductTotalInStore[index] = this.productAll[index].totalProduct;
      }
      console.log(this.productApi.chartDataProductTotalInStore);


    });
  }
  openChart() {

    Chart.defaults.global.defaultFontFamily = "'Prompt','Poppins-Regular'";
    var ctx = (<any>document.getElementById('mychart')).getContext('2d');
    var chart = new Chart(ctx, {

      type: 'bar',
      data: {
        labels: this.chartproductlabel,
        datasets: [{
          data: this.productApi.chartDataProductInStore,
          label: "จำนวนสินค้านำเข้า",
          backgroundColor: "#ECF3FF",
          borderColor: "#3880ff",

          borderWidth: "1",
          hoverBackgroundColor: "#B6D0FF",
          hoverBorderColor: "#B6D0FF",
          // fill: false
        }, {
          data: this.productApi.chartDataProductSellInStore,
          label: "จำนวนสินค้าที่ขาย",
          borderColor: "#5BC0BE",
          backgroundColor: "#C3E8E7",
          borderWidth: "1",
          hoverBackgroundColor: "#4B9E9C",
          hoverBorderColor: "#4B9E9C",
          // fill: false
        }, {
          data: this.productApi.chartDataProductTotalInStore,
          label: "จำนวนสินค้าคงเหลือ",
          borderColor: "#7044ff",
          backgroundColor: "#F2EEFF",
          borderWidth: "1",
          hoverBackgroundColor: "#CBBBFF",
          hoverBorderColor: "#CBBBFF",
          // fill: false
        }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true

            }
          }]
        }
      }
    });

    var ctx = (<any>document.getElementById('mychart2')).getContext('2d');
    var chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.chartLabel,
        datasets: [
          {
            label: "รายรับ",
            backgroundColor: "#E9FBF0",
            borderColor: "#10dc60",
            borderWidth: "1",
            hoverBackgroundColor: "#A8F2C5",
            hoverBorderColor: "#A8F2C5",
            data: [
              this.revenuejan,
              this.revenuefeb,
              this.revenuemar,
              this.revenueapril,
              this.revenuemay,
              this.revenuejune,
              this.revenuejuly,
              this.revenueaug,
              this.revenueseptember,
              this.revenueoct,
              this.revenuenovember,
              this.revenuedecem],
          },
          {
            label: "รายจ่าย",
            backgroundColor: "#FDEDED ",
            borderColor: "#f04141 ",
            borderWidth: "1",
            hoverBackgroundColor: "#F9B9B9",
            hoverBorderColor: "#F9B9B9",

            data: [
              this.expenditurejan,
              this.expenditurefeb,
              this.expendituremar,
              this.expenditureapril,
              this.expendituremay,
              this.expenditurejune,
              this.expenditurejuly,
              this.expenditureaug,
              this.expenditureseptember,
              this.expenditureoct,
              this.expenditurenovember,
              this.expendituredecember,]
          },
          {
            label: "กำไรสุทธิ",

            backgroundColor: "#F0F9FD ",
            borderColor: "#5BC0EB ",
            borderWidth: "1",
            hoverBackgroundColor: "#C3E8F7",
            hoverBorderColor: "#C3E8F7",

            data: [
              this.revenuejan - this.expenditurejan,
              this.revenuefeb - this.expenditurefeb,
              this.revenuemar - this.expendituremar,
              this.revenueapril - this.expenditureapril,
              this.revenuemay - this.expendituremay,
              this.revenuejune - this.expenditurejune,
              this.revenuejuly - this.expenditurejuly,
              this.revenueaug - this.expenditureaug,
              this.revenueseptember - this.expenditureseptember,
              this.revenueoct - this.expenditureoct,
              this.revenuenovember - this.expenditurenovember,
              this.revenuedecem - this.expendituredecember,]
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }




}
