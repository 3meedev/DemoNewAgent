import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { admin } from 'src/Models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  dataUser: FormGroup;
  dataUserz: admin;
  editDatauser: any;
  submit: boolean = false;
  
    
  constructor(public activate: ActivatedRoute, public userApi: UserService, public formbuilder: FormBuilder, public route: Router) {
    this.editDatauser = this.activate.snapshot.paramMap.get('_id');
    console.log(this.editDatauser);
    this.dataUser = this.formbuilder.group({
      'idAdmin': [null, Validators.required],
      'nameAdmin': [null, Validators.required],
      'usernameAdmin': [null, Validators.required],
      'passwordAdmin': [null, Validators.required],
      'telAdmin': [null, Validators.required],
      'levelAdmin': [null, Validators.required],
      'addressAdmin': [null, Validators.required]

    });

    

    this.userApi.GetAdminByid(this.editDatauser).subscribe(it => {
      console.log(it);
      this.dataUser.patchValue(it)
      console.log(this.dataUser.value);
      
      

    });

  }

  ngOnInit() {
  }


  log() {
    console.log(this.dataUser.value);
    this.dataUserz = this.dataUser.value
    console.log(this.dataUserz);

    this.userApi.EditDataAdmin(this.editDatauser, this.dataUserz).subscribe(it => {
      console.log(it);

      this.route.navigate(['/user']);

    });

  }
}
