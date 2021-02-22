import { Component, OnInit } from '@angular/core';
import {ImageService} from '../../services/image.service';

@Component({
  selector: 'app-load-images',
  templateUrl: './load-images.component.html',
  styleUrls: ['./load-images.component.css'],
  providers: [ImageService]
})
export class LoadImagesComponent implements OnInit {

  public status: string;
  constructor(private _imageService: ImageService) { 
    this.status='';
  }

  ngOnInit(): void {
  }

  onClick(){
    this._imageService.putrepoossian().subscribe(
      response=>{
        if(response.status == 'success'){
          this.status = 'success';
        }else{
          this.status = 'error';
        }
      },
      error =>{console.log(error);}
    );
  }

}
