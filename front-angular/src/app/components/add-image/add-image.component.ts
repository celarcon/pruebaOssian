import { Component, OnInit } from '@angular/core';
import { Image } from '../../models/image';
import {ImageService} from '../../services/image.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css'],
  providers: [ImageService]
})
export class AddImageComponent implements OnInit {

  public image: Image;
  public status: string;

  constructor(private _imageService: ImageService) { 
    this.image = new Image(1,'','','','');
    this.status = '';
  }

  ngOnInit(): void {
    console.log(this.image);
  }
  onSubmit(form){
    this._imageService.addImage(this.image).subscribe(
      response=>{
        if(response.status == 'success'){
          this.status = 'success';
          form.reset();
        }else{
          this.status = 'error';
        }
      },
      error =>{console.log(error);}
    );
  }
}
