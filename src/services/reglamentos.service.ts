import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class ReglamentosService {
  constructor(public afDB: AngularFireDatabase){
  }
  reglamento = [];
  public getReglamentos(){
    return this.afDB.list('/reglamentos/');
  }
  public getReglamento(id){
    return this.afDB.object('/reglamentos/' + id);
  }
  public createReglamento(reglamento){
    return this.afDB.database.ref('/reglamento/' + reglamento.id).set(reglamento);
  }
  public createParentReglamento(reglamento){
    return this.afDB.database.ref('/reglamentos/' + reglamento.id).set(reglamento);
  }
  public editReglamento(reglamento){
    return this.afDB.database.ref('/reglamentos/' + reglamento.id).set(reglamento);
  }
  public deleteReglamento(reglamento){
    return this.afDB.database.ref('/reglamentos/' + reglamento.id).remove();
  }
}
