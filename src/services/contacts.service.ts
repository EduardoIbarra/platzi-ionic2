import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database/database';

@Injectable()
export class ContactsService {
    constructor(public afDB: AngularFireDatabase){
    }
    contact = [];
    public getContacts(){
        return this.afDB.list('/contact/');
    }
    public getContact(id){
        return this.afDB.object('/contact/' + id);
    }
    public createContact(contact){
        return this.afDB.database.ref('/contact/' + contact.id).set(contact);
    }
    public createParentContact(contact){
        return this.afDB.database.ref('/contact/' + contact.id).set(contact);
    }
    public editContact(contact){
        return this.afDB.database.ref('/contact/' + contact.id).set(contact);
    }
    public deleteContact(contact){
        return this.afDB.database.ref('/contact/' + contact.id).remove();
    }
}
