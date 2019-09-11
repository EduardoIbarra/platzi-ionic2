import { Component } from '@angular/core';
import {HomePage} from "../home/home";
import {ProfilePage} from "../profile/profile";
import {ReglamentoPage} from "../reglamento/reglamento";
import { EventosPage } from '../eventos/eventos';
import {AnunciosPage} from "../anuncios/anuncios";
import {SurveysPage} from "../surveys/surveys";
import {VisitsPage} from "../visits/visits";
import {VisitReadPage} from "../visit-read/visit-read";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab0Root = AnunciosPage;
  tab1Root = HomePage;
  tab2Root = ProfilePage;
  tab3Root = ReglamentoPage;
  tab4Root = EventosPage;
  tab5Root = SurveysPage;
  tab6Root = VisitsPage;
  tab7Root = VisitReadPage;

  constructor() {

  }
}
