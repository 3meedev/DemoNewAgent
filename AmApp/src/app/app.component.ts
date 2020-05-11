import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from "@angular/router";
import { CallApiService } from './call-api.service';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'

  


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
   fahome=faHome;

  public appPages = [
    {
      title: 'หน้าหลัก',
      url: '/list',
      icon:'home'
    },
    // {
    //   title: 'List',
    //   url: '/list',
    //   icon: 'list'
    // },
    // {
    //   title: 'สั้งซื้อ',
    //   url: '/order',
    //   icon: 'list'
    // },
    {
      title: 'บัญชีผู้ใช้งาน',
      url: '/account-user',
      icon: 'person'
    },

  ];
  faSignOutAlt=faSignOutAlt;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public route: Router,
    public callApi: CallApiService,
    public menu: MenuController,
  ) {


    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.menuRadius();
    });
  }
  menuRadius() {
    setTimeout(() => {
      document.querySelector('ion-menu').shadowRoot.querySelector('.menu-inner').setAttribute('style', 'border-radius:0px 20px 20px 0px');
    }, 2000);
  }

  logout() {
    this.route.navigate(['/login']);
    this.callApi.nameUser = null
    this.callApi.name = null
    this.menu.close();
    this.menu.enable(false);

  }
}
