import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VideoThumbnailService {
  constructor() {}

  generateThumbnail(videoUrl: string, time: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = videoUrl;
      video.currentTime = time; 

      video.addEventListener('loadeddata', () => {
        const canvas = document.createElement('canvas');
        canvas.width = 300; 
        canvas.height = 200; 

        const context = canvas.getContext('2d');
        if (context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/png')); 
        } else {
          reject('Failed to get canvas context');
        }
      });

      video.addEventListener('error', (e) => {
        reject(`Error loading video: ${e}`);
      });

      video.load();
    });
  }
}
