import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { StreamingPageComponent } from './streaming-page/streaming-page.component';
import { UploadPageComponent } from './upload-page/upload-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect root to home
  { path: 'home', component: HomePageComponent },
  { path: 'stream', component: StreamingPageComponent },
  { path: 'upload', component: UploadPageComponent },
  { path: '**', redirectTo: 'home' }, // Wildcard route to handle unknown routes
];
