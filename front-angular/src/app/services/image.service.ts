import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../models/image';
import { global } from './global';
import { stringify } from '@angular/compiler/src/util';

@Injectable()
export class ImageService {

    public url: string;

    constructor(public _http: HttpClient){
        this.url = global.url;
    }

    //Llamada para añadir una imagen 
    addImage(image):Observable<any>{
        let json = JSON.stringify(image);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'addimage',params,{headers:headers});
    }

    //Llamada para que devuleva todo el listado de imagenes ordenado
    getImages(page):Observable<any>{
        if(!page)
            page =1;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'images?page='+page,{headers:headers});
    }

    //Llamada para que devuelva una sola imagen 
    getImage(id):Observable<any>{

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'getimage/'+id,{headers:headers});
    }

    //LLamada para recoger json de un repositorio externo
    putrepoossian():Observable<any>{

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'putrepoossian',{headers:headers});
    }

    //Lamada borra imagen
    deleteImage(id):Observable<any>{

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.delete(this.url+'deleteimage/'+id,{headers:headers});
    }

    //Llamada actualiza imagen
    updateImage(image):Observable<any>{
        let json = JSON.stringify(image);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.put(this.url+'editimage/'+image.idimage,params,{headers:headers});
    }
}