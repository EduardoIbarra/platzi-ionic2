import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class SurveysService {
  constructor(public afDB: AngularFireDatabase){
  }
  public getSurveys(){
    return this.afDB.list('/surveys/');
  }
  public getSurvey(id){
    return this.afDB.object('/surveys/' + id);
  }
  public createSurvey(survey){
    return this.afDB.database.ref('/survey/' + survey.id).set(survey);
  }
  public editSurvey(survey){
    return this.afDB.database.ref('/surveys/' + survey.id).set(survey);
  }
  public deleteSurvey(survey){
    return this.afDB.database.ref('/surveys/' + survey.id).remove();
  }
  public getSurveyAnswers(id){
    return this.afDB.list(`/survey_answers/${id}/answers`);
  }
  public postAnswer(survey){
    return this.afDB.database.ref(`/survey_answers/${survey.id}/answers/${survey.address}`).set(survey);
  }
  public getSurveyAnswer(id, address){
    return this.afDB.object(`/survey_answers/${id}/answers/${address}`);
  }
  public getSurveysAnswered(id){
    return this.afDB.object(`/surveysAnswered/${id}`);
  }
}
