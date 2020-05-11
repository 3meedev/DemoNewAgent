import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Product } from './Models/Product';
import { Order,receipt,DataOrder } from './Models/Order';
import { User } from './Models/User'

@Injectable({
  providedIn: 'root'
})

export class CallApiService {

  public nameUser: string;
  public name: string;
  public ref:boolean;

  // public static host: string = "https://bosjazz555.appspot.com/api/";
  public static host: string = "https://localhost:5001/api/"
  constructor(public http: HttpClient) { }

  public GetListAllProduct() {
    return this.http.get<Order>(CallApiService.host + 'Order/GetOrderAll');
  }
  public AddOrder(data: Order) {
    console.log(data);
    return this.http.post<Order>(CallApiService.host + 'Order/AddOrder', data);
  }
  public AddMirrorOrder(data: DataOrder) {
    console.log(data);
    return this.http.post<DataOrder>(CallApiService.host + 'Order/AddMirrorOrder', data);
  }
  public GetProductById(Id: string) {
    return this.http.get<Order>(CallApiService.host + 'Order/GetOrderById/' + Id);
  }
  public editokorder(Id: string, data) {
    return this.http.put<Order>(CallApiService.host + 'Order/EditCancelOrder/' + Id, data);
  }
  public editsendorder(Id: string, data) {
    return this.http.put<Order>(CallApiService.host + 'Order/EditAcceptOrder/' + Id, data);
  }
  public editAddFile(Id: string, data) {
    return this.http.put<Order>(CallApiService.host + 'Order/EditAddFile/' + Id, data);
  }
  public getallproduct() {
    return this.http.get<Product>(CallApiService.host + 'Product/GetProductAll');
  }
  public GetProductBydata(data: string) {
    return this.http.get<Product>(CallApiService.host + 'Product/GetProductBydata/' + data);
  }
  public GetProductid(Id: string) {
    return this.http.get<Product>(CallApiService.host + 'Product/GetProductById/' + Id);
  }
  public CancelSellTotalProduct(id: string, data) {
    return this.http.put<Product>(CallApiService.host + 'Product/CancelSellTotalProduct/' + id, data);
  }
  public GetOrderbyUsername(data: string) {
    return this.http.get<Product>(CallApiService.host + 'Order/GetOrderbyUsername/' + data);
  }
  //////////////////////////////////// user //////////////////////////////////////////////////
  public GetUserData() {
    return this.http.get<User>(CallApiService.host + 'User/GetUserAll')
  }
  public GetUserbyData(data: string) {
    return this.http.get<User>(CallApiService.host + 'User/GetUserBydata/' + data)
  }
  public AddReceipt(data: receipt) {    
    return this.http.post<receipt>(CallApiService.host + 'Order/AddReceipt', data);
  }
  public GetReceiptAll() {
    return this.http.get<receipt>(CallApiService.host + 'Order/GetReceiptAll')
  }
  public DeleteOrder(Id: string) {
    return this.http.delete<Order>(CallApiService.host + 'Order/DeleteOrder/' + Id);
  }
  public GetUserByid(Id: string) {
    return this.http.get<User>(CallApiService.host + 'User/GetUserByid/' + Id);
  }
  public EditDataUser(Id: string, data) {
    return this.http.put<User>(CallApiService.host + 'User/EditUser/' + Id, data);
  }
  public GetReceiptById(Id: string) {
    return this.http.get<receipt>(CallApiService.host + 'Order/GetReceiptById/' + Id);
  }
  public DeleteOrderAll() {
    return this.http.delete<Order>(CallApiService.host + 'Order/DeleteOrderAll');
  }
  public GetDataMirrorOrderById(Id: string) {
    return this.http.get<DataOrder>(CallApiService.host + 'Order/GetDataMirrorOrderById/' + Id)
  }
  public GetMirrorDataOrderAll() {
    return this.http.get<DataOrder>(CallApiService.host + 'Order/GetMirrorDataOrderAll');
  }

}
