import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Message} from '../../models/messages/message.interface';
import {MESSAGE_LIST} from '../../mocks/messages/messages';
import { Profile } from "../../models/profile/profile.interface";
/**
 * Generated class for the InboxPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {

  messageList : Message[] = MESSAGE_LIST;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log(this.messageList);
  }

  navigateToSearchUserPage() {
    this.navCtrl.push('SearchUserPage');
  }
  openProfile(event : Profile)
  {
    
    this.navCtrl.push('MessagePage', { profile : event});
  }
}
