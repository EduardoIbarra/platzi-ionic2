import {Component, ViewChild} from '@angular/core';
import {LoadingController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {TabsPage} from "../pages/tabs/tabs";
import {ReglamentoPage} from "../pages/reglamento/reglamento";
import {VisitReadPage} from "../pages/visit-read/visit-read";
import {FrequentVisitsPage} from "../pages/frequent-visits/frequent-visits";
import {UsersService} from "../services/users.service";
import {MorososPage} from "../pages/morosos/morosos";
import {SurveysPage} from "../pages/surveys/surveys";
import {ContactPage} from "../pages/contact/contact";
import {VisitsPage} from '../pages/visits/visits';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsPage;
  pages: Array<{title: string, component: any}>;
  isGuard: boolean = false;
  isAdmin: boolean = false;
  user: any = {};

  constructor(
      private platform: Platform,
      private statusBar: StatusBar,
      private splashScreen: SplashScreen,
      private usersService: UsersService,
      public loadingCtrl: LoadingController,
    ) {
    localStorage.removeItem('firebase:previous_websocket_failure');
    this.getUser();
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.pages = [
        { title: 'Reglamento', component: ReglamentoPage },
      ];
      if (!this.user) {
        return;
      }
      this.isGuard = this.usersService.getUserValueFromLocalStorage('isGuard');
      this.isAdmin = this.usersService.getUserValueFromLocalStorage('admin');
      if (this.isGuard || this.isAdmin) {
        this.pages.push({ title: 'Morosos', component: MorososPage });
        this.pages.push({ title: 'Visitas (Anterior)', component: VisitsPage });
        this.pages.push({ title: 'Escanear (Anterior)', component: VisitReadPage });
      }
      this.pages.push({ title: 'Visitas Frecuentes', component: FrequentVisitsPage });
      this.pages.push({ title: 'Encuestas', component: SurveysPage });
      this.pages.push({ title: 'Contacto', component: ContactPage });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('asp_user'));
    return this.user;
  }
  cleanUpNetwork() {
    localStorage.removeItem('firebase:previous_websocket_failure');
    let loading = this.loadingCtrl.create({
      content: 'Por favor espere...'
    });
    loading.present().then(() => {
      location.reload();
    });
  }
  logout(){
    localStorage.removeItem('firebase:previous_websocket_failure');
    localStorage.removeItem('admin');
    localStorage.removeItem('asp_user');
    this.user = null;
    alert('Nos vemos pronto, vecin@!');
    let loading = this.loadingCtrl.create({
      content: 'Por favor espere...'
    });
    loading.present().then(() => {
      location.reload();
    });
  }
}

