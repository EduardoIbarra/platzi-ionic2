import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SurveysService} from "../../services/surveys.service";
import {SurveyPage} from "../survey/survey";

/**
 * Generated class for the SurveyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-survey',
  templateUrl: 'surveys.html',
})
export class SurveysPage {
  surveys: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public surveysService: SurveysService) {
    this.surveysService.getSurveys()
      .valueChanges().subscribe((surveys)=>{
        this.surveys = surveys;
        console.log(surveys);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SurveyPage');
  }

  itemSelected(item){
    console.log(item);
    this.navCtrl.push(SurveyPage, {survey: item});
  }

}
