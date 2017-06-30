import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Profile } from '../../models/profile/profile.interface';
import { Message } from "../../models/messages/message.interface";
import { AuthService } from "../../providers/auth/auth.service";
import { DataService } from "../../providers/data/data.service";
import { ChatService } from "../../providers/chat/chat.service";
import { Observable } from "rxjs/Observable";


@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  userProfile :Profile;
  userId : string;
  selectedProfile: Profile;
  messageList : Observable<Message[]>;
  constructor(private chat : ChatService ,private auth: AuthService ,private data: DataService,public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewWillLoad() {
    console.log(this.navParams.get('profile'));
    this.selectedProfile = this.navParams.get('profile');
    
    this.data.getAuthenticatedUserProfile().subscribe(data => this.userProfile = data);
    this.messageList =  this.chat.getChats(this.selectedProfile.$key);
}
  async send(value: string)
  {

 
    try{
      const message : Message = {
      
        userToId : this.selectedProfile.$key,
        userToProfile : {
            firstName : this.selectedProfile.firstName,
            lastName : this.selectedProfile.lastName
        },
        userFromId : this.userProfile.$key,
        userFromProfile : 
        {
          firstName : this.userProfile.firstName,
          lastName : this.userProfile.lastName
        },
        content: value 
      };
      await this.chat.sendChat(message);
    }
    catch(e)
    {
      console.log(e);
    }
  }
}
