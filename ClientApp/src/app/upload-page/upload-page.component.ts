import { Component } from '@angular/core';
import { VideoService } from '../shared/service/video.service';
import { Category } from '../shared/models/category.model';

@Component({
  selector: 'app-upload-page',
  standalone: true,
  imports: [],
  templateUrl: './upload-page.component.html',
  styleUrl: './upload-page.component.scss'
})
export class UploadPageComponent {
  video = {
    title: '',
    description: '',
    categoryId: '',
    file: null as File | null
  };

  categories: Category[] = []; // Assuming you have a Category model

  constructor(private videoService: VideoService) {}

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
    }
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
