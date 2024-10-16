import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { StreamingPageComponent } from './streaming-page/streaming-page.component';
import { UploadPageComponent } from './upload-page/upload-page.component';

export const routes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'stream', component: StreamingPageComponent },
    { path: 'upload', component: UploadPageComponent },
  ];