import { Component } from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";
import {SocialSharing} from "@ionic-native/social-sharing";
import {UsersService} from "../../services/users.service";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-visit-creation-result',
  templateUrl: 'visit-creation-result.html',
})
export class VisitCreationResultPage {
  password: string = '';
  user:any = {};
  details:any = {};
  path: string = null;
  id: string = null;
  visit: any = {};
  constructor(
    public params: NavParams,
    private socialSharing: SocialSharing,
    public viewCtrl: ViewController,
    public usersService: UsersService,
  ) {
    this.path = this.params.get('path');
    const splitted = this.path.split('/');
    this.id = splitted[splitted.length - 1];
    console.log(this.path);
    this.usersService.getByPath(this.path).valueChanges().subscribe((visit) => {
      this.visit = visit;
    });
  }

  shareCode() {
    this.toDataURL(`https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${this.path}`, (dataUrl) => {
      const options = {
        message: `Muestre este código a su entrada o este número *${this.id}*`, // not supported on some apps (Facebook, Instagram)
        subject: `Autorización de entrada: ${this.id}`, // fi. for email
        files: [dataUrl, `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${this.path}`], // an array of filenames either locally or remotely
        url: `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${this.path}`,
        chooserTitle: 'Escoge un app' // Android only, you can override the default share sheet title
      };
      console.log('RESULT:', dataUrl);
      this.socialSharing.shareWithOptions(options).then((data) => {
        console.log(data);
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  toDataURL(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
      let reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
