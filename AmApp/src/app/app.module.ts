import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Router } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";

import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EditProfilePageModule } from 'src/app/edit-profile/edit-profile.module';
import { ChangePassPageModule } from 'src/app/change-pass/change-pass.module';
import { DetailOrderPageModule } from 'src/app/detail-order/detail-order.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'

import { far } from '@fortawesome/free-regular-svg-icons'

import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas,far);
@NgModule({
  declarations: [AppComponent,],
  entryComponents: [],
  exports: [],
  imports: [BrowserModule,
    IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    EditProfilePageModule,
    ChangePassPageModule,
    DetailOrderPageModule,
    FontAwesomeModule
  ],
  providers: [

    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
