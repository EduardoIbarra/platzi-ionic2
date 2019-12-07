import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class SuggestionsService {
    constructor(public afDB: AngularFireDatabase){
    }
    suggestion = [];
    public getSuggestions(){
        return this.afDB.list('/suggestions/');
    }
    public getSuggestion(id){
        return this.afDB.object('/suggestions/' + id);
    }
    public createSuggestion(suggestion){
        return this.afDB.database.ref('/reglamento/' + suggestion.id).set(suggestion);
    }
    public createParentSuggestion(suggestion){
        return this.afDB.database.ref('/suggestions/' + suggestion.id).set(suggestion);
    }
    public editSuggestion(suggestion){
        return this.afDB.database.ref('/suggestions/' + suggestion.id).set(suggestion);
    }
    public deleteSuggestion(suggestion){
        return this.afDB.database.ref('/suggestions/' + suggestion.id).remove();
    }
}
