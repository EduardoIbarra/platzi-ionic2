import { Component } from '@angular/core';
import {AlertController, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {ContactsService} from "../../services/contacts.service";
import {CContactTypes, IContactType} from "../../constants/contact-type";

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  contact: any = {};
  user: any = {};
  contactTypes: IContactType[] = CContactTypes;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private contactsService: ContactsService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
  ) {
    this.user = JSON.parse(localStorage.getItem('asp_user'));
  }

  sendContact() {
    if (!this.user.email) {
      alert('Debe de ingresar una cuenta de correo');
      return;
    }
    if (!this.contact.contact_type) {
      alert('Debe de seleccionar un tipo de contacto');
      return;
    }
    if (!this.contact.message) {
      alert('Debe de escribir sus comentarios');
      return;
    }
    const contact = {
      id: Date.now(),
      name: this.user.nombre,
      address_key: this.user.address_key,
      email: this.user.email,
      contact_type: this.contact.contact_type,
      message: this.contact.message,
    };
    this.contactsService.createContact(contact).then((data) => {
      let toast = this.toastCtrl.create({
        message: 'Su contacto ha sido enviado con éxito',
        duration: 3000,
        position: 'top'
      });
      toast.present().then((data) => {
        this.navCtrl.pop();
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }
}
