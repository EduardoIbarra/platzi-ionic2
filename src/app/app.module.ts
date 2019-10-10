import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {HomePage} from '../pages/home/home';
import {PlacePage} from "../pages/place/place";
import {TabsPage} from "../pages/tabs/tabs";
import {ProfilePage} from "../pages/profile/profile";
import {TerceraPage} from "../pages/tercera/tercera";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireModule} from "angularfire2";
import {PlacesService} from "../services/places.service";
import {CorrectInfoPage} from "../pages/correct-info/correct-info";
import {SuggestionsService} from "../services/suggestions.service";
import {PlaceEditPage} from "../pages/place-edit/place-edit";
import {ReglamentoPage} from "../pages/reglamento/reglamento";
import {ReglamentoDetallePage} from "../pages/reglamento-detalle/reglamento-detalle";
import {Facebook} from "@ionic-native/facebook";
import { EventosPage } from '../pages/eventos/eventos';
import { EventoPage } from '../pages/evento/evento';
import { EventsService } from '../services/events.service';
import { LoginPage } from '../pages/login/login';
import { UsersService } from '../services/users.service';
import {Camera} from "@ionic-native/camera";
import {AnnouncementsService} from "../services/announcements.service";
import {AnunciosPage} from "../pages/anuncios/anuncios";
import {AnnouncementPage} from "../pages/announcement/announcement";
import {AnnouncementEditPage} from "../pages/announcement-edit/announcement-edit";
import {SurveysPage} from "../pages/surveys/surveys";
import {SurveyPage} from "../pages/survey/survey";
import {SurveysService} from "../services/surveys.service";
import {VisitsPage} from "../pages/visits/visits";
import {ReglamentosService} from "../services/reglamentos.service";
import {VisitsService} from "../services/visits.service";
import {VisitNewPage} from "../pages/visit-new/visit-new";
import {VisitReadPage} from "../pages/visit-read/visit-read";
import {FrequentVisitsPage} from "../pages/frequent-visits/frequent-visits";
import {FrequentVisitNewPage} from "../pages/frequent-visit-new/frequent-visit-new";
import { SocialSharing } from '@ionic-native/social-sharing';
import {VisitCreationResultPage} from "../modals/visit-creation-result/visit-creation-result";
import {Screenshot} from "@ionic-native/screenshot";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {AnunciosPageModule} from "../pages/anuncios/anuncios.module";
import {PipesModule} from "../pipes/pipes.module";
export const firebaseConfig = {
  apiKey: "AIzaSyABeT1r7uepxBHMZrVyu60jAhzWqXf6zZs",
  authDomain: "directorioasp.firebaseapp.com",
  databaseURL: "https://directorioasp.firebaseio.com",
  projectId: "directorioasp",
  storageBucket: "directorioasp.appspot.com",
  messagingSenderId: "93635767567"
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlacePage,
    TabsPage,
    ProfilePage,
    TerceraPage,
    CorrectInfoPage,
    PlaceEditPage,
    ReglamentoPage,
    ReglamentoDetallePage,
    EventosPage,
    EventoPage,
    LoginPage,
    AnnouncementPage,
    AnnouncementEditPage,
    SurveysPage,
    SurveyPage,
    VisitsPage,
    VisitNewPage,
    VisitReadPage,
    FrequentVisitsPage,
    FrequentVisitNewPage,
    VisitCreationResultPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AnunciosPageModule,
    PipesModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlacePage,
    TabsPage,
    ProfilePage,
    TerceraPage,
    CorrectInfoPage,
    PlaceEditPage,
    ReglamentoPage,
    ReglamentoDetallePage,
    EventosPage,
    EventoPage,
    LoginPage,
    AnunciosPage,
    AnnouncementPage,
    AnnouncementEditPage,
    SurveysPage,
    SurveyPage,
    VisitsPage,
    VisitNewPage,
    VisitReadPage,
    FrequentVisitsPage,
    FrequentVisitNewPage,
    VisitCreationResultPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PlacesService,
    SuggestionsService,
    ReglamentosService,
    Facebook,
    EventsService,
    UsersService,
    Camera,
    AnnouncementsService,
    SurveysService,
    VisitsService,
    BarcodeScanner,
    SocialSharing,
    Screenshot,
  ]
})
export class AppModule {}
