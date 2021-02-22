import { Component, OnInit } from '@angular/core';
import { Image } from '../../models/image';
import {ImageService} from '../../services/image.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.css'],
  providers: [ImageService]
})
export class ImageEditComponent implements OnInit {

  public image: Image;
  public status;

  constructor(
    private _imageService: ImageService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { 
    this.image = new Image(1,'','','','');
    this.status = '';
  }

  ngOnInit(): void {
    this.getImage();
  }

  getImage(){
    this._route.params.subscribe(params =>{
      var id = +params['id'];
      this._imageService.getImage(id).subscribe(
        response=>{
          if(response.status == 'success'){
            this.image = response.image;
          }else{
            console.log(response.message);
            this._router.navigate(['/home']);
          }
        }
      );
    });
  }

  onSubmit(form){
    this._imageService.updateImage(this.image).subscribe(
      response=>{
        if(response.status == 'success'){
          this.status = 'success';
          this._router.navigate(['/home']);
        }else{
          this.status = 'error';
        }
      },
      error =>{console.log(error);}
    );
  }
}