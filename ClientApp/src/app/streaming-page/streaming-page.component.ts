import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-streaming-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './streaming-page.component.html',
  styleUrl: './streaming-page.component.scss'
})
export class StreamingPageComponent {
  videoId: string | null = null;
  videoUrl: string | null = null;
  private apiUrl: string;

  constructor(private route: ActivatedRoute, private router: Router, @Inject('AppConfig') private appConfig: any) {
    this.apiUrl = appConfig.videoUrl; 
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.videoId = params.get('id');
      if (this.videoId) {
        this.videoUrl = this.getVideoUrl(this.videoId);
      }
    });
  }

  getVideoUrl(videoId: string): string {
    return `${this.apiUrl}/${videoId}`; 
  }

  goBack(): void {
    this.router.navigate(['']);
  }
}
