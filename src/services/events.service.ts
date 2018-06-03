import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database/database';

@Injectable()
export class EventsService {
    constructor(public afDB: AngularFireDatabase){
    }
    event = [];
    public getEvents(){
        return this.afDB.list('/events/');
    }
    public getEvent(id){
        return this.afDB.object('/events/' + id);
    }
    public createEvent(event){
        return this.afDB.database.ref('/events/' + event.id).set(event);
    }
    public createParentEvent(event){
        return this.afDB.database.ref('/events/' + event.id).set(event);
    }
    public editEvent(event){
        return this.afDB.database.ref('/events/' + event.id).set(event);
    }
    public deleteEvent(event){
        return this.afDB.database.ref('/events/' + event.id).remove();
    }
}
