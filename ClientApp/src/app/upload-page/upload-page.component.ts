import { Component } from '@angular/core';
import { VideoService } from '../shared/service/video.service';
import { Category } from '../shared/models/category.model';

import { FormsModule } from '@angular/forms';
import { VideoThumbnailService } from '../shared/service/video-thumbnail.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-page',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.scss'],
})
export class UploadPageComponent {
  video = {
    title: '',
    description: '',
    categoryName: '',
    thumbnail: '',
    file: null as File | null,
  };

  categories: Category[] = []; 
  filteredCategories: Category[] = []; 
  thumbnailUrl: string | null = null;

  fileSizeWarning: boolean = false;
  maxFileSize = 100 * 1024 * 1024; // 100MB


  constructor(private videoService: VideoService, private videoThumbnailService: VideoThumbnailService, private router: Router) {}

  ngOnInit(): void {
    console.log ("init categories");
    this.loadCategories(); 
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
      if (file.size > this.maxFileSize) {
        this.fileSizeWarning = true;
      } else {
        this.fileSizeWarning = false;
        this.video.file = file; 
        this.generateThumbnail(file); 
      }
    }
  }

  filterCategories(): void {
    const query = this.video.categoryName.toLowerCase();
    this.filteredCategories = this.categories.filter(category =>
      category.name?.toLowerCase().includes(query)
    );
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
    
    // Ensure all fields are correctly appended
    if (this.video.file) {
      formData.append('file', this.video.file as File);
    } else {
      console.error('No video file selected.')
      return;
    }
    
    formData.append('title', this.video.title || '');
    formData.append('description', this.video.description || '');
    formData.append('categoryName', this.video.categoryName || '');
    formData.append('thumbnail', this.thumbnailUrl || '');
  
    // Log to ensure all form data is present
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  
    this.videoService.uploadVideo(formData).subscribe(
      (response: any) => {
        console.log('Video uploaded successfully:', response);
        this.router.navigate(['']); 
      },
      (error: any) => {
        console.error('Error uploading video:', error);
      }
    );
  }
  
  
}
