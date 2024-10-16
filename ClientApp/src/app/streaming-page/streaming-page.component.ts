import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-streaming-page',
  standalone: true,
  imports: [],
  templateUrl: './streaming-page.component.html',
  styleUrl: './streaming-page.component.scss'
})
export class StreamingPageComponent {
  videoId: string | null = null;
  videoUrl: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Get the video ID from the route parameters
    this.route.paramMap.subscribe(params => {
      this.videoId = params.get('id');
      if (this.videoId) {
        this.videoUrl = this.getVideoUrl(this.videoId);
      }
    });
  }

  getVideoUrl(videoId: string): string {
    // Construct the URL to the video file in wwwroot
    return `https://your-domain.com/videos/${videoId}`; // Adjust the path based on your server configuration
  }

  goBack(): void {
    // Navigate back to the previous page
    this.router.navigate(['']); // Adjust the path if your home page has a different route
  }
}
