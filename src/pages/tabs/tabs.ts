import { Component } from '@angular/core';
import {HomePage} from "../home/home";
import {ProfilePage} from "../profile/profile";
import {ReglamentoPage} from "../reglamento/reglamento";
import { EventosPage } from '../eventos/eventos';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ProfilePage;
  tab3Root = ReglamentoPage;
  tab4Root = EventosPage;

  constructor() {

  }
}
