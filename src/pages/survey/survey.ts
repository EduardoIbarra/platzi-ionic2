import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {SurveysService} from "../../services/surveys.service";
import {UsersService} from "../../services/users.service";

/**
 * Generated class for the SurveyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-survey',
  templateUrl: 'survey.html',
})
export class SurveyPage {
  survey: any = {};
  selectedOption: string;
  user: any;
  previousAnswer: any = null;
  isChampion = false;
  address: any = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public surveysService: SurveysService,
    public userService: UsersService,
    private toastCtrl: ToastController,
  ) {
    this.address = this.userService.getUserValueFromLocalStorage('address_key');
    this.isChampion = this.userService.getUserValueFromLocalStorage('champion');
    this.user = JSON.parse(localStorage.getItem('asp_user'));
    this.survey = this.navParams.get('survey');
    this.surveysService.getSurveyAnswer(this.survey.id, this.address).valueChanges().subscribe((data) => {
      this.previousAnswer = data;
    }, (error) => {
      console.log(error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SurveyPage');
  }

  saveAnswer() {
    if (!this.selectedOption) {
      alert('Debe seleccionar una opción');
      return;
    }
    if (!confirm('Seguro que deseas votar por esta opción?')) {
      return;
    }
    let survey = {
      id: this.survey.id,
      uid: this.user.uid,
      name: this.user.nombre,
      address: this.address,
      choice: this.selectedOption,
      timestamp: Date.now(),
    };
    this.surveysService.postAnswer(survey).then((data) => {
      let toast = this.toastCtrl.create({
        message: 'Usted ha votado con éxito',
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

}
