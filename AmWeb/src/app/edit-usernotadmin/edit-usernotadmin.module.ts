import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditUsernotadminPage } from './edit-usernotadmin.page';

const routes: Routes = [
  {
    path: '',
    component: EditUsernotadminPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditUsernotadminPage]
})
export class EditUsernotadminPageModule {}
