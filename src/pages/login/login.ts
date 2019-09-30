import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { UsersService } from '../../services/users.service';
import {CStreets, Street} from "../../constants/streets";

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
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, public usersService: UsersService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  login() {
    this.usersService.signInWithEmailAndPassword(this.user).then((data: any) => {
      this.usersService.getUser(data.uid).valueChanges().subscribe((u: any) => {
        u.details = data;
        if(u.admin) {
          localStorage.setItem('admin', 'true');
        }else {
          localStorage.setItem('admin', 'false');
        }
        localStorage.setItem('asp_user', JSON.stringify(u));
        this.dismiss();
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
        uid: data.uid,
        email: data.email,
        nombre: this.user.nombre,
        address_key: this.user.street.code + this.user.street_number,
      };
      this.usersService.createUser(thisUser).then((user) => {
        this.operation = 'login';
        alert('Registrado con éxito, ya puedes hacer Login.');
      });
    }).catch((e) => {
      console.log(e);
      alert('Error: ' + e.message);
    });
  }
}
