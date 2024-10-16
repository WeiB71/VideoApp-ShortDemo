import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Video } from '../models/video.model';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl: string;

  constructor(private http: HttpClient, @Inject('AppConfig') private appConfig: any) {
    this.apiUrl = appConfig.apiUrl; 
  }


  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.apiUrl}/videos`); 
  }
  
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`); 
  }  

   uploadVideo(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }
}
