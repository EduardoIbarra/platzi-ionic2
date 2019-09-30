import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {TabsPage} from "../pages/tabs/tabs";
import {ReglamentoPage} from "../pages/reglamento/reglamento";
import {VisitReadPage} from "../pages/visit-read/visit-read";
import {FrequentVisitsPage} from "../pages/frequent-visits/frequent-visits";
import {UsersService} from "../services/users.service";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsPage;
  pages: Array<{title: string, component: any}>;
  isGuard: boolean = false;

  constructor(
      private platform: Platform,
      private statusBar: StatusBar,
      private splashScreen: SplashScreen,
      private usersService: UsersService,
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.pages = [
        { title: 'Reglamento', component: ReglamentoPage },
      ];
      this.isGuard = this.usersService.getUserValueFromLocalStorage('isGuard');
      if (this.isGuard) {
        this.pages.push({ title: 'Escannear Visita', component: VisitReadPage });
      } else {
        this.pages.push({ title: 'Visitas Frecuentes', component: FrequentVisitsPage });
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
}

