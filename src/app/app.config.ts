import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {provideHttpClient} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "lb-labs", appId: "1:156315066691:web:f0202b1f69228e66b90ff6", storageBucket: "lb-labs.appspot.com", apiKey: "AIzaSyDyG8ch11R2cWtAK-R63y9-h_0wrqVLbxU", authDomain: "lb-labs.firebaseapp.com", messagingSenderId: "156315066691" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
