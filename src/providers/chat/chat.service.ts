import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/first';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Channel } from "../../models/channel/channel.interface";
import { ChannelMessage } from "../../models/channel/channel-message.interface";
import { Profile } from "../../models/profile/profile.interface";
import { Message } from "../../models/messages/message.interface";
import { AuthService } from "../auth/auth.service";

import { Observable } from "rxjs/Observable";

@Injectable()
export class ChatService {

  constructor(private auth: AuthService, private database: AngularFireDatabase) {
    console.log('Hello ChatProvider Provider');
  }

  addChannel(channelName: string) {
    this.database.list(`channel-names`).push({ name: channelName });
  }
  getChannelListRef(): FirebaseListObservable<Channel> {
    return this.database.list(`channel-names`);
  }
  getChannelChatRef(channelKey: string) {
    return this.database.list(`channels/${channelKey}`);
  }
  async sendChannelChatMessage(channelKey: string, message: ChannelMessage) {
    await this.database.list(`/channels/${channelKey}`).push(message);
  }
  async sendChat(message: Message) {
    await this.database.list(`/messages/`).push(message);

  }

  getChats(userToId: string) {
    return this.auth.getAuthenticatedUser().map(auth => auth.uid)
    .mergeMap(uid => this.database.list(`/user-messages/${uid}/${userToId}`))
    .mergeMap(chats => {

        return Observable.forkJoin(
          chats.map( chat => this.database.object(`/messages/${chat.$key}`).first()),(...vals : Message[]) => { console.log(vals); return vals;}
        );
    });
  }
}
