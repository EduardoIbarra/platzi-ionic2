import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {PlacePage} from "../pages/place/place";
import {TabsPage} from "../pages/tabs/tabs";
import {ProfilePage} from "../pages/profile/profile";
import {TerceraPage} from "../pages/tercera/tercera";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireModule} from "angularfire2";
export const firebaseConfig = {
  apiKey: "AIzaSyBKX0YmmU6ybw5jqXh4qIBWJ2uoZgZXCl8",
  authDomain: "ioncaching.firebaseapp.com",
  databaseURL: "https://ioncaching.firebaseio.com",
  projectId: "ioncaching",
  storageBucket: "ioncaching.appspot.com",
  messagingSenderId: "1071640340819"
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlacePage,
    TabsPage,
    ProfilePage,
    TerceraPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlacePage,
    TabsPage,
    ProfilePage,
    TerceraPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
