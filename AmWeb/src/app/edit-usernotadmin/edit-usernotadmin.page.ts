import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { user } from 'src/Models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-usernotadmin',
  templateUrl: './edit-usernotadmin.page.html',
  styleUrls: ['./edit-usernotadmin.page.scss'],
})
export class EditUsernotadminPage implements OnInit {
  dataUser: FormGroup;
  dataUserz: user;
  editDatauser: any;
  submit: boolean = false;
  
    
  constructor(public activate: ActivatedRoute, public userApi: UserService, public formbuilder: FormBuilder, public route: Router) {
    this.editDatauser = this.activate.snapshot.paramMap.get('_id');
    console.log(this.editDatauser);
    this.dataUser = this.formbuilder.group({
      'idUser': [null, Validators.required],
      'nameUser': [null, Validators.required],
      'username': [null, Validators.required],
      'password': [null, Validators.required],
      'telUser': [null, Validators.required],
      'statusUser': [null, Validators.required],
      'addressUser': [null, Validators.required],
      'cardUser': [null, Validators.required]

    });
      this.userApi.GetUserByid(this.editDatauser).subscribe(it => {
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

    this.userApi.EditDataUser(this.editDatauser, this.dataUserz).subscribe(it => {
      console.log(it);

      this.route.navigate(['/user']);

    });

  }

}
