import { Component } from '@angular/core';
import {HomePage} from "../home/home";
import {ProfilePage} from "../profile/profile";
import {ReglamentoPage} from "../reglamento/reglamento";
import { EventosPage } from '../eventos/eventos';
import {AnunciosPage} from "../anuncios/anuncios";
import {SurveysPage} from "../surveys/surveys";
import {VisitsPage} from "../visits/visits";
import {VisitReadPage} from "../visit-read/visit-read";
import {UsersService} from "../../services/users.service";
import {FcmProvider} from "../../providers/fcm/fcm";
import {ToastController} from "ionic-angular";
import {tap} from "rxjs/operators";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  contactsTab = HomePage;
  profileTab = ProfilePage;
  tab4Root = EventosPage;
  visitsTab = VisitsPage;
  visitReadTab = VisitReadPage;
  isGuard: any = {};
  user: any = {};

  constructor(
    private usersService: UsersService,
    public fcmProvider: FcmProvider,
    public toastCtrl: ToastController,
  ) {
    this.user = JSON.parse(localStorage.getItem('asp_user'));
    this.isGuard = this.usersService.getUserValueFromLocalStorage('isGuard');
  }

  ionViewDidLoad() {
    this.fcmProvider.getToken();
    this.fcmProvider.listenToNotifications().pipe(
      tap(msg => {
        const toast = this.toastCtrl.create({
          message: msg.body,
          duration: 3000
        });
        toast.present();
      })
    ).subscribe()
  }
}

