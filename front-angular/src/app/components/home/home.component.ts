import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/models/image';
import {ImageService} from '../../services/image.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ImageService]
})
export class HomeComponent implements OnInit {

  public images: Array<Image>;
  public status: string;
  public page;
  public next_page;
  public prev_page;
  public number_pages;

  constructor(
    private _imageService: ImageService,
    private _route: ActivatedRoute,
    private _router: Router
    ) {
    this.images =[];
    this.status = '';
   }

  ngOnInit(): void {
    this._route.params.subscribe(paramas =>{
      var page = +paramas['page'];
      
      if(!page){
        page=1;
        this.prev_page = 1;
        this.next_page = 2;
      }

      this.getImages(page);
    });
  }

  getImages(page){

    this._imageService.getImages(page).subscribe(
      response=>{
        if(response.status == 'success'){
          this.status = 'success';
          this.images = response.images;
  
          var number_pages =[];
          for(var i = 1; i <= response.total_pages; i++){
            number_pages.push(i);
          }
          this.number_pages = number_pages;

          if(page>=2){
            this.prev_page = page-1;
          }else{
            this.prev_page = 1;
          }

          if(page < response.total_pages){
            this.next_page = page +1;
          }else{
            this.next_page = response.total_pages;
          }
        }else{
          this.status = 'error';
        }
      },
      error =>{console.log(error);}
    );
  }

  deleteImage(id){
    this._imageService.deleteImage(id).subscribe(
      response=>{
        if(response.status == 'success'){
          alert("La imagen se borro exitosamente");
          this.getImages(this.page);
          //this.status = 'success';
        }else{
          //this.status = 'error';
        }
        console.log(response);
      },
      error =>{console.log(error);}
    );
  }

}
