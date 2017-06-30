import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ChatService } from "../../providers/chat/chat.service";
import { Observable } from "rxjs/Observable";
import { Channel } from "../../models/channel/channel.interface";
import { FirebaseListObservable } from "angularfire2/database";

/**
 * Generated class for the ChannelsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-channels',
  templateUrl: 'channels.html',
})
export class ChannelsPage {

  channelList : FirebaseListObservable<Channel[]>;
  constructor(private chat : ChatService, private alertControl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    // console.log('ionViewDidLoad ChannelsPage');
    this.getChannels();
  }
  showAddChannelDialog()
  {
    this.alertControl.create({
      title : 'Channel Name',
      inputs: [{
        name : 'channelName'
      }],
      buttons:[{
        text:'Cancel',
        role: 'cancel'
      },
      {
        text: 'Add',
        handler: data =>{this.chat.addChannel(data.channelName) }
      }]
    }).present();

  }
  getChannels(){
   this.channelList=  this.chat.getChannelListRef();

  }

  selectChannel(channel : Channel ){
    this.navCtrl.push('ChannelChatPage', {channel});

  }

}
