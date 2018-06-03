import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UsersService {
  constructor(private afDb: AngularFireDatabase, private afAuth: AngularFireAuth) { }
  registerWithEmailAndPassword (user) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }
  signInWithEmailAndPassword (user) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }
  createUser(user) {
    return this.afDb.object('users/' + user.uid).set(user);
  }
  getUsers() {
    return this.afDb.list('users/');
  }
  getUser(uid) {
    return this.afDb.object('users/' + uid);
  }
  setUserProperty(key, value, uid) {
    return this.afDb.object('users/' + uid + '/' + key).set(value);
  }
}
