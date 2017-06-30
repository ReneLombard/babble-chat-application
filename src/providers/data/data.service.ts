import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database/firebase_list_observable';
import { User } from 'firebase/app';
import { Profile } from '../../models/profile/profile.interface';
import { database } from 'firebase';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { AuthService } from "../auth/auth.service";
@Injectable()
export class DataService {


  profileObject: FirebaseObjectObservable<Profile>
  profileList: FirebaseListObservable<Profile>;
  constructor(private authService: AuthService, private database: AngularFireDatabase) {
  }

  async saveProfile(user: User, profile: Profile) {
    this.profileObject = this.database.object(`/profiles/${user.uid}`);
    try {

      await this.profileObject.set(profile);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }

  }

  getAuthenticatedUserProfile() {
    return this.authService.getAuthenticatedUser()
      .map(user => user.uid)
      .mergeMap(authID => this.database.object(`profiles/${authID}`))
      .take(1);

  }
  getProfile(user: User) {
    this.profileObject = this.database.object(`/profiles/${user.uid}`, { preserveSnapshot: true });
    return this.profileObject.take(1);
  }
  searchUser(firstName: string) {
    const query = this.database.list('/profiles/', {
      query: {
        orderByChild: 'firstName',
        equalTo: firstName
      }
    });
    return query.take(1);
  }

  setUserOnline(profile: Profile) {
    const ref = database().ref(`online-users/${profile.$key}`);
    try {
      ref.update({ ...profile });
      ref.onDisconnect().remove();
    }
    catch (e)
    {
      console.error(e);
     }
  }

  getOnlineUsers() : FirebaseListObservable<Profile[]>
  {
    return this.database.list(`online-users/`);

  }
}
