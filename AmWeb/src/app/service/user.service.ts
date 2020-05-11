import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { admin,user } from "src/Models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public statusAdmin:string;
  public nameAdmin:string;
  public imageAdmin:string;
  public checkMenu:boolean = false;
  
  public static host: string = "https://localhost:5001/api/";
  constructor(public http: HttpClient) { }

  public GetAdminAll() {
    return this.http.get<admin>(UserService.host + 'User/GetAdminAll');
  }
  public AddDataAdmin(data: admin) {
    console.log(data);
    return this.http.post<admin>(UserService.host + 'User/AddAdmin', data);

  }
  public GetAdminByid(Id: string) {
    return this.http.get<admin>(UserService.host + 'User/GetAdminById/' + Id);
  }

  public EditDataAdmin(Id: string, data) {
    return this.http.put<admin>(UserService.host + 'User/EditAdmin/' + Id, data);
  }

  public DeleteDataAdmin(Id: string) {
    return this.http.delete<admin>(UserService.host + 'User/DeleteAdmin/' + Id);
  }

  // ------------------------------------------------------------------------------

  public GetUserAll() {
    return this.http.get<user>(UserService.host + 'User/GetUserAll');
  }
  public AddDataUser(data: user) {
    console.log(data);
    return this.http.post<user>(UserService.host + 'User/AddUser', data);

  }
  public GetUserByid(Id: string) {
    return this.http.get<user>(UserService.host + 'User/GetUserById/' + Id);
  }

  public EditDataUser(Id: string, data) {
    return this.http.put<user>(UserService.host + 'User/EditUser/' + Id, data);
  }

  public DeleteDataUser(Id: string) {
    return this.http.delete<user>(UserService.host + 'User/DeleteUser/' + Id);
  }
}
