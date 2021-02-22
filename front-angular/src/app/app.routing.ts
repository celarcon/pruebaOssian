import { Routes, RouterModule } from '@angular/router';

import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { AddImageComponent } from './components/add-image/add-image.component';
import { LoadImagesComponent } from './components/load-images/load-images.component';
import { ImageEditComponent } from './components/image-edit/image-edit.component';
import { ImageDetailComponent } from './components/image-detail/image-detail.component';

const appRoutes: Routes =[
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'home/:page', component: HomeComponent},
    {path: 'addImage', component: AddImageComponent},
    {path: 'loadImages', component: LoadImagesComponent},
    {path: 'imageEdit/:id', component: ImageEditComponent},
    {path: 'imageDetail/:id', component: ImageDetailComponent},
    {path: 'error', component: ErrorComponent},
    {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing = RouterModule.forRoot(appRoutes);
