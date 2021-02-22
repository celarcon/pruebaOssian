import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/models/image';
import { ImageService } from '../../services/image.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css'],
  providers: [ImageService]
})
export class ImageDetailComponent implements OnInit {

  public image: Image;
  public status;

  constructor(
    private _imageService: ImageService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.image = new Image(1, '', '', '', '');
    this.status = '';
  }

  ngOnInit(): void {
    this.loadImage();
  }

  loadImage() {
      this._route.params.subscribe(params => {
        var id = +params['id'];
        this._imageService.getImage(id).subscribe(
          response => {
            if (response.status == 'success') {
              this.image = response.image;
            } else {
              console.log(response.message);
            }
          }
        );
      });
  }

  deleteImage(id){
    this._imageService.deleteImage(id).subscribe(
      response=>{
        if(response.status == 'success'){
          alert("La imagen se borro exitosamente");
          this._router.navigate(['/home']);
        }else{
          //this.status = 'error';
        }
        console.log(response);
      }
    );
  }

}
