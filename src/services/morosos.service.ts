import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database/database';

@Injectable()
export class MorososService {
    constructor(public afDB: AngularFireDatabase){
    }
    public getMorosos(){
        return this.afDB.list('/morosos/');
    }
    public getMoroso(address_key){
        return this.afDB.object('/morosos/' + address_key);
    }
    public createMoroso(moroso){
        return this.afDB.database.ref('/morosos/' + moroso.address_key).set(moroso);
    }
    public createParentMoroso(moroso){
        return this.afDB.database.ref('/morosos/' + moroso.address_key).set(moroso);
    }
    public editMoroso(moroso){
        return this.afDB.database.ref('/morosos/' + moroso.address_key).set(moroso);
    }
    public deleteMoroso(moroso){
        return this.afDB.database.ref('/morosos/' + moroso.address_key).remove();
    }
}
