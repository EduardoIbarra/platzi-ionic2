import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {SurveysService} from "../../services/surveys.service";
import {UsersService} from "../../services/users.service";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  comments: string;
  user: any;
  previousAnswer: any = null;
  isChampion = false;
  address: any = null;
  surveyAnswered: any = null;
  safeUrl: SafeResourceUrl;

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  //Chart Labels
  public barChartLabels:string[] = ['Pregunta'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  //Chart data
  public barChartData:any[] = [
    {data: [50], label: 'Opción 1'},
    {data: [50], label: 'Opción 2'}
  ];

  // Chart events
  public chartClicked(e:any):void {
    console.log(e);
  }

  // Chart events
  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public surveysService: SurveysService,
    public userService: UsersService,
    private toastCtrl: ToastController,
    private sanitizer: DomSanitizer,
  ) {
    this.address = this.userService.getUserValueFromLocalStorage('address_key');
    this.isChampion = this.userService.getUserValueFromLocalStorage('champion');
    this.user = JSON.parse(localStorage.getItem('asp_user'));
    this.survey = this.navParams.get('survey');
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.survey.youtube_video_id}`);
    this.barChartLabels = [this.survey.title];
    this.surveysService.getSurveyAnswer(this.survey.id, this.address).valueChanges().subscribe((data: any) => {
      this.previousAnswer = data;
      this.comments = data && data.comments;
      this.selectedOption = data && data.choice;
    }, (error) => {
      console.log(error);
    });
    if (this.survey.finished) {
      this.surveysService.getSurveysAnswered(this.survey.id).valueChanges().subscribe((data) => {
        this.surveyAnswered = data;
        console.log(this.surveyAnswered);
        this.barChartData = [];
        this.surveyAnswered.options.forEach((o) => {
          this.barChartData.push({
            data: [o.count],
            label: o.answer.name,
          });
        });
      }, (error) => {
        console.log(error);
      });
    }
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
      comments: this.comments || '',
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
