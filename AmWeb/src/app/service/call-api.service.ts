import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { product } from 'src/Models/product';
import { Order } from 'src/Models/order';

@Injectable({
  providedIn: 'root'
})
export class CallApiService {
  // public idUser:string;
  // public static host: string = "https://bosjazz555.appspot.com/api/";
  public static host: string ="https://localhost:5001/api/" 
  constructor(public http: HttpClient) { }

  public GetListAllProduct() {
    return this.http.get<Order>(CallApiService.host+ 'Order/GetOrderAll');
  }
  public AddOrder(data:Order){
    console.log(data);
    return this.http.post<Order>(CallApiService.host+ 'Order/AddOrder' , data);
  }
  public GetProductById(Id:string){
    return this.http.get<Order>(CallApiService.host+'Order/GetOrderById/'+ Id);
 }
 public editokorder(Id:string, data){
  return this.http.put<Order>(CallApiService.host+'Order/EditCancelOrder/'+ Id,data);
 }
 public editsendorder(Id:string, data){
  return this.http.put<Order>(CallApiService.host+'Order/EditAcceptOrder/'+ Id,data);
 }
 public getallproduct( ){
  return this.http.get<product>(CallApiService.host+'Product/GetProductAll');
 }
 public GetProductBydata(data:string ){
  return this.http.get<product>(CallApiService.host+'Product/GetProductBydata/'+ data);
 }
 public GetProductid(Id:string ){
  return this.http.get<product>(CallApiService.host+'Product/GetProductById/'+Id);
 }
 public CancelSellTotalProduct(id: string, data){
  return this.http.put<Order>(CallApiService.host+'Order/CancelSellTotalProduct/'+ id,data);
 }


 public GetReceiptAll(){
  return this.http.get<Order>(CallApiService.host+'Order/GetReceiptAll');
 }
}
