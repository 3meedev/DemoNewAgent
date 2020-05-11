import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashbroadPage } from './dashbroad.page';
import { NgxSpinnerModule } from 'ngx-spinner';



const routes: Routes = [
  {
    path: '',
    component: DashbroadPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes),
  ],
  declarations: [DashbroadPage]
})
export class DashbroadPageModule {}
