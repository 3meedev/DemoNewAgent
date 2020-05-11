import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdduserPage } from './adduser.page';
import { ComponentsModule } from '../component.module';

const routes: Routes = [
  {
    path: '',
    component: AdduserPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  

  ],
  declarations: [AdduserPage]
})
export class AdduserPageModule {}
