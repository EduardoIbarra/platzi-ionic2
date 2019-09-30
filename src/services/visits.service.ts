import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database/database';

@Injectable()
export class VisitsService {
  constructor(public afDB: AngularFireDatabase){
  }
  public getVisits(){
    return this.afDB.list('/visits/');
  }
  public getVisitsForDate(date){
    return this.afDB.list(`/visits/${date}`);
  }
  public getVisitsForAddressKey(addressKey){
    return this.afDB.list(`/visitsByAddress/${addressKey}`);
  }
  public getFrequentVisits(){
    return this.afDB.list('/frequent_visits/');
  }
  public getFrequentVisitsByAddressKey(addressKey){
    return this.afDB.list(`/frequent_visits/${addressKey}`);
  }
  public createVisit(path, visit){
    return this.afDB.database.ref(path).set(visit);
  }
  public createFrequentVisit(visit){
    return this.afDB.database.ref(`/frequent_visits/${visit.addressKey}/${visit.timestamp}`).set(visit);
  }
  public setAsVisited(path){
    return this.afDB.database.ref(`${path}/visited`).set(true);
  }
  public buildPath(visit) {
    const myDate: any = new Date(visit.date);
    let path = `visits/${this.getStringDate(myDate)}`;
    path += `/${visit.street.code}${visit.street_number}`;
    path += `/${visit.timestamp}`;
    return path;
  }
  public getStringDate(date) {
    return `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}`;
  }
}
