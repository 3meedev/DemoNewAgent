import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { IonicModule } from '@ionic/angular';

import { ClearStorePage } from './clear-store.page';

const routes: Routes = [
  {
    path: '',
    component: ClearStorePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxPaginationModule
  ],
  declarations: [ClearStorePage]
})
export class ClearStorePageModule {}
