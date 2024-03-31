import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
 import { AngularFireAuthModule  } from '@angular/fire/compat/auth'
 import { AngularFirestoreModule  } from '@angular/fire/compat/firestore' 




 const firebaseConfig= {
  apiKey: "AIzaSyCgTkwb9-KYt89lh6XAxgTa4TAapWwhLLs",
  authDomain: "rickandmortyproject-63849.firebaseapp.com",
  databaseURL: "https://rickandmortyproject-63849-default-rtdb.firebaseio.com",
  projectId: "rickandmortyproject-63849",
  storageBucket: "rickandmortyproject-63849.appspot.com",
  messagingSenderId: "880414820714",
  appId: "1:880414820714:web:038edfe2e8ed2d99507d13"
};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),  provideHttpClient(withFetch()), provideAnimations(), importProvidersFrom([
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
  
  
  
  ])]
};
