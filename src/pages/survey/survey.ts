import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public surveysService: SurveysService, public userService: UsersService) {
    this.user = JSON.parse(localStorage.getItem('asp_user'));
    this.user.address = this.user.street.toLowerCase().replace(' ', '_') + '_' + this.user.number;
    const formattedStreet = this.user.street.toLowerCase().replace(' ', '_');
    this.userService.getChampion(formattedStreet, this.user.number).valueChanges().subscribe((data: any) => {
      this.isChampion = (data.uid === this.user.uid);
      console.log(data);
    }, (error) => {
      console.log(error);
    });
    this.survey = this.navParams.get('survey');
    this.surveysService.getSurveyAnswer(this.survey.id, this.user.address).valueChanges().subscribe((data) => {
      this.previousAnswer = data;
    }, (error) => {
      console.log(error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SurveyPage');
  }

  saveAnswer() {
    if (!confirm('Seguro que deseas votar por esta opción?')) {
      return;
    }
    let survey = {
      id: this.survey.id,
      uid: this.user.uid,
      name: this.user.nombre,
      street: this.user.street,
      number: this.user.number,
      choice: this.selectedOption,
      address: this.user.address,
      timestamp: Date.now(),
    };
    this.surveysService.postAnswer(survey).then((data) => {
      alert('Usted ha votado con éxito');
    }).catch((error) => {
      console.log(error);
    });
  }

}
