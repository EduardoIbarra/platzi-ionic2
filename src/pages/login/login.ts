import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UsersService } from '../../services/users.service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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
          localStorage.setItem('admin', true);
        }else {
          localStorage.setItem('admin', false);
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
    this.usersService.registerWithEmailAndPassword(this.user).then((data: any) => {
      data.created_at = Date.now();
      const thisUser: any = {uid: data.uid, email: data.email, nombre: this.user.nombre};
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
