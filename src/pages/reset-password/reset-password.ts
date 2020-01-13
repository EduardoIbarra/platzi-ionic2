import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { UsersService } from '../../services/users.service';

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  email: string = null;
  operation = 'resetPassword';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public usersService: UsersService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }
  resetPassword() {
    this.usersService.resetPassword(this.email).then((data: any) => {
      alert('Se ha enviado un correo para recuperar su contraseña en nuestro sistema');
      this.navCtrl.pop();
    }).catch((e) => {
      console.log(e);
      if (e.code == "auth/user-not-found") {
        alert('El correo ingresado no existe. Favor de verificarlo');
        return;
      }
      alert('Error: ' + e.message);
    });
  }
  goBack() {
    this.navCtrl.pop();
  }
}
