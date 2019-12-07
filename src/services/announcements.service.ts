import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class AnnouncementsService {
    constructor(public afDB: AngularFireDatabase){
    }
    announcement = [];
    public getAnnouncements(){
        return this.afDB.list('/announcements/');
    }
    public getAnnouncement(id){
        return this.afDB.object('/announcements/' + id);
    }
    public createAnnouncement(announcement){
        return this.afDB.database.ref('/announcements/' + announcement.id).set(announcement);
    }
    public createParentAnnouncement(announcement){
        return this.afDB.database.ref('/announcements/' + announcement.id).set(announcement);
    }
    public editAnnouncement(announcement){
        return this.afDB.database.ref('/announcements/' + announcement.id).set(announcement);
    }
    public deleteAnnouncement(announcement){
        return this.afDB.database.ref('/announcements/' + announcement.id).remove();
    }
}
