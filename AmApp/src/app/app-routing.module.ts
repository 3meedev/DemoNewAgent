import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'order', loadChildren: './order/order.module#OrderPageModule' },
  { path: 'detail', loadChildren: './detail/detail.module#DetailPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'list', loadChildren: './list/list.module#ListPageModule' },
  { path: 'user', loadChildren: './user/user.module#UserPageModule' },
  { path: 'orderdetail', loadChildren: './orderdetail/orderdetail.module#OrderdetailPageModule' },
  { path: 'account-user', loadChildren: './account-user/account-user.module#AccountUserPageModule' },
  
  { path: 'change-pass', loadChildren: './change-pass/change-pass.module#ChangePassPageModule' },  { path: 'edit-profile', loadChildren: './edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'detail-order', loadChildren: './detail-order/detail-order.module#DetailOrderPageModule' },


  
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
