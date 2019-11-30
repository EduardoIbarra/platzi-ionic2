import { Injectable } from '@angular/core';
import {Firebase} from "@ionic-native/firebase/ngx";
import {AngularFireDatabase} from "angularfire2/database";
import {Platform} from "ionic-angular";
import {UsersService} from "../../services/users.service";

@Injectable()
export class FcmProvider {

  constructor(
    public firebaseNative: Firebase,
    public afDB: AngularFireDatabase,
    private platform: Platform,
    private usersService: UsersService,
  ) {
    console.log('Hello FcmProvider Provider');
  }

  async getToken() {
    let token;
    if(this.platform.is('android')) {
      token = await this.firebaseNative.getToken();
    }
    if(this.platform.is('ios')) {
      token = await this.firebaseNative.getToken();
      const perm = await this.firebaseNative.grantPermission();
    }
    return this.saveTokenToFireDatabase(token);
  }

  private saveTokenToFireDatabase(token) {
    if (!token) return;
    const uid = this.usersService.getUserValueFromLocalStorage('uid');
    const recordData = {
      token,
      userId: uid,
    };
    return this.afDB.database.ref('/devices/' + token).set(recordData);
  }

  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen();
  }
}
