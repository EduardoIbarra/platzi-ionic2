import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database/database';

@Injectable()
export class VisitsService {
  constructor(public afDB: AngularFireDatabase){
  }
  public getVisits(){
    return this.afDB.list('/visits/');
  }
  public createVisit(path, visit){
    return this.afDB.database.ref(path).set(visit);
  }
  public setAsVisited(path){
    return this.afDB.database.ref(`${path}/visited`).set(true);
  }
  public buildPath(visit) {
    const myDate: any = new Date(visit.date);
    let path = `visits/${myDate.getFullYear()}_${myDate.getMonth()}_${myDate.getDate()}`;
    path += `/${visit.street.code}${visit.street_number}`;
    path += `/${visit.timestamp}`;
    return path;
  }
}
