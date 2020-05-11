import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { ProductService } from "src/app/service/product.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();

  selectedImage: any;
  imageUrl: any;
  image: any;
  fileToUpload: any;
  formData: any;
  isShowNullImage: boolean = true;
  isShowImage: boolean = true;
  uploadProgress;
  constructor(private http: HttpClient,public api:ProductService) { }

  ngOnInit() {
  }



  uploadFile = (files,event) => {
    
    
    this.selectedImage = event.target.files[0];
    console.log(this.selectedImage);
    // this.api.imageName = event.target.files[0]
    let reader = new FileReader();

    reader.onload = (e: any) => {
     
      
      this.imageUrl = e.target.result;
      this.api.imageName = this.imageUrl
      console.log(this.api.imageName);
      
      
    };
    reader.readAsDataURL(this.selectedImage);
    if (files.length === 0) {
      return;
    }
    this.isShowNullImage = false;
    this.isShowImage = false;
    this.fileToUpload = <File>files[0];
    this.formData = new FormData();
    this.formData.append('file', this.fileToUpload, this.fileToUpload.name);
    
    

    
 

    
  } 
}