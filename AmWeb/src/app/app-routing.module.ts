import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)},
  { path: 'store', loadChildren: './store/store.module#StorePageModule' },
  { path: 'user', loadChildren: './user/user.module#UserPageModule' },
  { path: 'adduser', loadChildren: './adduser/adduser.module#AdduserPageModule' },
  { path: 'edit-store', loadChildren: './edit-store/edit-store.module#EditStorePageModule' },
  { path: 'add-store', loadChildren: './add-store/add-store.module#AddStorePageModule' },
  { path: 'clear-store', loadChildren: './clear-store/clear-store.module#ClearStorePageModule' },
  { path: 'edit-clear', loadChildren: './edit-clear/edit-clear.module#EditClearPageModule' },
  { path: 'edit-user', loadChildren: './edit-user/edit-user.module#EditUserPageModule' },
  { path: 'product', loadChildren: './product/product.module#ProductPageModule' },
  { path: 'add-product', loadChildren: './add-product/add-product.module#AddProductPageModule' },
  { path: 'edit-product', loadChildren: './edit-product/edit-product.module#EditProductPageModule' },
  { path: 'order', loadChildren: './order/order.module#OrderPageModule' },
  { path: 'order-list', loadChildren: './order-list/order-list.module#OrderListPageModule' },
  { path: 'order-cancel', loadChildren: './order-cancel/order-cancel.module#OrderCancelPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'dashbroad', loadChildren: './dashbroad/dashbroad.module#DashbroadPageModule' },
  { path: 'addusernotadmin', loadChildren: './addusernotadmin/addusernotadmin.module#AddusernotadminPageModule' },
  { path: 'edit-usernotadmin', loadChildren: './edit-usernotadmin/edit-usernotadmin.module#EditUsernotadminPageModule' },
  { path: 'detail', loadChildren: './detail/detail.module#DetailPageModule' },
  { path: 'test', loadChildren: './test/test.module#TestPageModule' },
  { path: 'detail-product', loadChildren: './detail-product/detail-product.module#DetailProductPageModule' },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
