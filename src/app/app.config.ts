import { HttpClient, provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideClientHydration } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { authInterceptor } from "./core/interceptors/auth.interceptor";
import { routes } from "./app-routing.module";
export const appConfig: ApplicationConfig = {
  providers: [

    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor]),
    ),
  ]
};
