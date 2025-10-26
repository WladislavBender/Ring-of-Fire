import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-68e04","appId":"1:539892555692:web:0262286d1978fe066b6409","storageBucket":"ring-of-fire-68e04.firebasestorage.app","apiKey":"AIzaSyBUANeqhyTySTlVhjzwMnxVh1pHiROQcWk","authDomain":"ring-of-fire-68e04.firebaseapp.com","messagingSenderId":"539892555692"})), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideRemoteConfig(() => getRemoteConfig())]
};
