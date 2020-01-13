import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {CStreets, Street} from "../constants/streets";

@Injectable()
export class UsersService {
  streets: Street[] = CStreets;
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
  getStreets() {
    return this.afDb.list('streets/');
  }
  getChampion(street, number) {
    return this.afDb.object(`champions/${street}/${number}`)
  }
  getUserValueFromLocalStorage(key) {
    const user = JSON.parse(localStorage.getItem('asp_user'));
    if (!user) return false;
    return user[key];
  }
  parseAddressFromStreetKey(addressKey) {
    const streetKey = addressKey.toString().substring(0, 3);
    const number = addressKey.toString().substring(3);
    return {
      addressKey: addressKey,
      street: this.streets.find(s => s.code === streetKey),
      number: number,
    };
  }
  getByPath(path) {
    return this.afDb.object(path);
  }
  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
}
