import { Component } from '@angular/core';
import { VideoService } from '../shared/service/video.service';
import { Category } from '../shared/models/category.model';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { VideoThumbnailService } from '../shared/service/video-thumbnail.service';

@Component({
  selector: 'app-upload-page',
  standalone: true,
  imports: [BrowserModule, FormsModule],
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.scss'],
})
export class UploadPageComponent {
  video = {
    title: '',
    description: '',
    categoryId: '',
    file: null as File | null,
  };

  categories: Category[] = []; 
  thumbnailUrl: string | null = null; 

  constructor(private videoService: VideoService, private videoThumbnailService: VideoThumbnailService) {}

  ngOnInit(): void {
    this.loadCategories(); // Load categories when the component initializes
  }

  loadCategories(): void {
    this.videoService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.video.file = file; // Store the file for upload
      this.generateThumbnail(file); // Generate thumbnail for the selected video
    }
  }

  generateThumbnail(file: File): void {
    const videoUrl = URL.createObjectURL(file);

    // Capture a thumbnail at 1 second into the video
    this.videoThumbnailService.generateThumbnail(videoUrl, 1).then(
      (thumbnail) => {
        this.thumbnailUrl = thumbnail; // Store the generated thumbnail URL
      },
      (error) => {
        console.error('Error generating thumbnail:', error);
      }
    );
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('file', this.video.file as File);
    formData.append('title', this.video.title);
    formData.append('description', this.video.description);
    formData.append('categoryId', this.video.categoryId);

    this.videoService.uploadVideo(formData).subscribe(
      (response: any) => {
        console.log('Video uploaded successfully:', response);
      },
      (error: any) => {
        console.error('Error uploading video:', error);
      }
    );
  }
}
