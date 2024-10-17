import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

export const AppConfig = {
  apiUrl: 'http://localhost:5231/api/data', 
  videoUrl: 'http://localhost:5231/uploads/', 
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(),
    { provide: 'AppConfig', useValue: AppConfig }, // Provide the AppConfig
  ],
};
