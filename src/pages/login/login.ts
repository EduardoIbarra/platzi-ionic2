import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import { UsersService } from '../../services/users.service';
import {CStreets, Street} from "../../constants/streets";
import {ResetPasswordPage} from "../reset-password/reset-password";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: any = {
    nombre: null,
    email: null,
    password: null,
    password2: null
  };
  operation = 'login';
  streets: Street[] = CStreets;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public usersService: UsersService,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login() {
    this.usersService.signInWithEmailAndPassword(this.user).then((data: any) => {
      this.usersService.getUser(data.uid || data.user && data.user.uid).valueChanges().subscribe((u: any) => {
        if(u.admin) {
          localStorage.setItem('admin', 'true');
        }else {
          localStorage.setItem('admin', 'false');
        }
        localStorage.setItem('asp_user', JSON.stringify(u));
        let loading = this.loadingCtrl.create({
          content: 'Por favor espere...'
        });
        loading.present().then(() => {
          location.reload();
        });
      });
    }).catch((e) => {
      console.log(e);
      alert('Error: ' + e.message);
    });
  }
  register() {
    if(this.user.password !== this.user.password2) {
      alert('Las contraseñas no coinciden. Verifique e intente de nuevo.');
      return;
    }
    if(!this.user.nombre || !this.user.email || !this.user.password || !this.user.password2 || !this.user.street || !this.user.street_number) {
      alert('Todos los campos son requeridos, favor de llenarlos e intentar de nuevo');
      return;
    }
    this.usersService.registerWithEmailAndPassword(this.user).then((data: any) => {
      data.created_at = Date.now();
      const thisUser: any = {
        uid: data.uid || data.user && data.user.uid,
        email: this.user.email,
        nombre: this.user.nombre,
        address_key: this.user.street.code + this.user.street_number,
      };
      this.usersService.createUser(thisUser).then((user) => {
        this.operation = 'login';
        alert('Registrado con éxito, haciendo login...');
        this.login();
      });
    }).catch((e) => {
      console.log(e);
      alert('Error: ' + e.message);
    });
  }
  resetPassword() {
    this.navCtrl.push(ResetPasswordPage);
  }
}
