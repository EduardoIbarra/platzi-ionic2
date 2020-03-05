import { Component } from '@angular/core';
import {HomePage} from "../home/home";
import {ProfilePage} from "../profile/profile";
import {VisitsPage} from "../visits/visits";
import {UsersService} from "../../services/users.service";
import {LoginPage} from "../login/login";
import {VisitsGuardPage} from '../visits-guard/visits-guard';
import {VisitReadNewPage} from '../visit-read-new/visit-read-new';
import {ContactPage} from '../contact/contact';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  contactsTab = HomePage;
  contactTab = ContactPage;
  profileTab = ProfilePage;
  loginTab = LoginPage;
  visitsTab = VisitsPage;
  visitsGuardTab = VisitsGuardPage;
  visitReadTab = VisitReadNewPage;
  isGuard: any = {};
  user: any = {};

  constructor(
    private usersService: UsersService,
  ) {
    this.user = JSON.parse(localStorage.getItem('asp_user'));
    this.isGuard = this.usersService.getUserValueFromLocalStorage('isGuard');
  }
}
