import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const AppConfig = {
  apiUrl: 'https://localhost:7221/api/data', // Replace with your actual API URL
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    { provide: 'AppConfig', useValue: AppConfig }, // Provide the AppConfig
  ],
};
