import { Component } from '@angular/core';
import {HomePage} from "../home/home";
import {ProfilePage} from "../profile/profile";
import {VisitsPage} from "../visits/visits";
import {VisitReadPage} from "../visit-read/visit-read";
import {UsersService} from "../../services/users.service";
import {LoginPage} from "../login/login";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  contactsTab = HomePage;
  profileTab = ProfilePage;
  loginTab = LoginPage;
  visitsTab = VisitsPage;
  visitReadTab = VisitReadPage;
  isGuard: any = {};
  user: any = {};

  constructor(
    private usersService: UsersService,
  ) {
    this.user = JSON.parse(localStorage.getItem('asp_user'));
    this.isGuard = this.usersService.getUserValueFromLocalStorage('isGuard');
  }
}
