import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { stock } from "src/Models/stock";
import { product } from "src/Models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  public chartDataProductInStore: number[] = [];  
  public chartDataProductSellInStore: number[] = [];
  public chartDataProductTotalInStore: number[] = [];
  public opentab: boolean = true;
  public imageName : string;
  

  public static host: string = "https://localhost:5001/api/";
  constructor(public http: HttpClient) { }

  public GetProductAll() {
    return this.http.get<product>(ProductService.host + 'Product/GetProductAll');
  }
  public AddDataProduct(data: product) {
    console.log(data);
    return this.http.post<product>(ProductService.host + 'Product/AddProduct', data);

  }
  public GetProductByid(Id: string) {
    return this.http.get<product>(ProductService.host + 'Product/GetProductById/' + Id);
  }

  public EditDataProduct(Id: string, data) {
    return this.http.put<product>(ProductService.host + 'Product/EditProduct/' + Id, data);
  }

  public EditAddTotalProduct(Id: string, data) {
    return this.http.put<product>(ProductService.host + 'Product/EditAddTotalProduct/' + Id, data);
  }

  public DeleteDataPeoduct(Id: string) {
    return this.http.delete<product>(ProductService.host + 'Product/DeleteProduct/' + Id);
  }
  public GetProductBydata(data:string ){
    return this.http.get<product>(ProductService.host+'Product/GetProductBydata/'+ data);
   }
   public AddSellTotalProduct(Id: string, data){
    return this.http.put<product>(ProductService.host+'Product/AddSellTotalProduct/'+ Id, data);
   }
   public GetProductid(Id:string ){
    return this.http.get<product>(ProductService.host+'Product/GetProductById/'+Id);
   }
   public EditProductstatus(Id:string,data){
    return this.http.put<product>(ProductService.host + 'Product/EditProductstatus/' + Id, data);
   }
   
  public AddStock(data: product) {
    console.log(data);
    return this.http.post<product>(ProductService.host + 'Stock/AddStock', data);

  }
  public AddStockTest(data:stock) {
    console.log(data);
    return this.http.post<stock>(ProductService.host + 'Stock/AddStockTest', data);
  }
  public GetStockAll() {
    return this.http.get<stock>(ProductService.host + 'Stock/GetStockAll');
  }
  public GetStockByid(Id: string) {
    return this.http.get<stock>(ProductService.host + 'Stock/GetStockById/' + Id);
  }
  public GetStock(month: string, year: string ){
    return this.http.get<stock>(ProductService.host+ 'Stock/GetStock/'+ month +'/'+ year);
   }
  public EditNumber(Id: string, data) {
    return this.http.put<product>(ProductService.host + 'Product/EditNumber/' + Id, data);
  }
  public UpdateStock(Id: string, data) {
    return this.http.put<stock>(ProductService.host + 'Stock/UpdateStock/' + Id, data);
  }

  
}
