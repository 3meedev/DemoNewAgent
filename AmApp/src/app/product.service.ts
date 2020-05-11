import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Product } from "src/app//Models/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  imageName:string;


  public static host: string = "https://localhost:5001/api/";
  constructor(public http: HttpClient) { }

  public GetProductAll() {
    return this.http.get<Product>(ProductService.host + 'Product/GetProductAll');
  }
  public AddDataProduct(data: Product) {
    console.log(data);
    return this.http.post<Product>(ProductService.host + 'Product/AddProduct', data);

  }
  public GetProductByid(Id: string) {
    return this.http.get<Product>(ProductService.host + 'Product/GetProductById/' + Id);
  }

  public EditDataProduct(Id: string, data) {
    return this.http.put<Product>(ProductService.host + 'Product/EditProduct/' + Id, data);
  }

  public EditAddTotalProduct(Id: string, data) {
    return this.http.put<Product>(ProductService.host + 'Product/EditAddTotalProduct/' + Id, data);
  }

  public DeleteDataPeoduct(Id: string) {
    return this.http.delete<Product>(ProductService.host + 'Product/DeleteProduct/' + Id);
  }
  public GetProductBydata(data:string ){
    return this.http.get<Product>(ProductService.host+'Product/GetProductBydata/'+ data);
   }
  public AddSellTotalProduct(Id: string, data){
    return this.http.put<Product>(ProductService.host+'Product/AddSellTotalProduct/'+ Id, data);
   }
   public CancelSellTotalProduct(id: string, amountProduct: string ){
    return this.http.get<Product>(ProductService.host+'Product/CancelSellTotalProduct/'+ id +'/'+ amountProduct);
   }
}
