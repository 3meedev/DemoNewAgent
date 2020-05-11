import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { store } from "src/Models/stroe";
// import { Stock } from "src/Models/stock";
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public static host: string = "https://localhost:5001/api/";
  constructor(public http: HttpClient) { }

  public GetProductStore() {
    return this.http.get<store>(StoreService.host + 'Store/GetStoreAll');
  }
  public AddStore(data: store) {
    console.log(data);
    return this.http.post<store>(StoreService.host + 'Store/AddStore', data);

  }
  public GetProductStoreByid(Id: string) {
    return this.http.get<store>(StoreService.host + 'Store/GetStoreById/' + Id);
  }

  public EditDataStore(Id: string, data) {
    return this.http.put<store>(StoreService.host + 'Store/EditStore/' + Id, data);
  }

  public EditDataStore2(Id: string, data) {
    return this.http.put<store>(StoreService.host + 'Store/EditStore2/' + Id, data);
  }

  public ClearDataStore(Id: string, data) {
    return this.http.put<store>(StoreService.host + 'Store/ClearStore/' + Id, data);
  }

  public TotalStore(Id: string, data) {
    return this.http.put<store>(StoreService.host + 'Store/TotalStore/' + Id, data);
  }

  public addclear(data: store) {
    console.log(data);
    return this.http.post<store>(StoreService.host + 'Store/AddClear', data);

  }

  public getproductallyear(data){
    return this.http.get<store>(StoreService.host+'Store/Getstoredatebyyear/'+ data);
   }
   public getproductlistbydateyear(data:string , data2:string){
    return this.http.get<store>(StoreService.host+'Store/Getstoredatebyfindall/' + data + '/' + data2);
   }

   public getproductallmonth(data){
    return this.http.get<store>(StoreService.host+'Store/Getstoredatebymouth/'+ data);
   }
}

