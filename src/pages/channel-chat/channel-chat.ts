import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Channel } from "../../models/channel/channel.interface";
import { ChannelMessage } from "../../models/channel/channel-message.interface";
import { ChatService } from "../../providers/chat/chat.service";
import { FirebaseListObservable } from "angularfire2/database";



@IonicPage()
@Component({
  selector: 'page-channel-chat',
  templateUrl: 'channel-chat.html',
})
export class ChannelChatPage {

  private channel = {} as Channel;
  private channelMessages : FirebaseListObservable<ChannelMessage[]>;

  constructor(private chatService : ChatService ,public navCtrl: NavController, public navParams: NavParams) {
}

ionViewWillLoad() {

  this.channel = this.navParams.get('channel');
  this.channelMessages =  this.chatService.getChannelChatRef(this.channel.$key); 
  console.log("channel Messages Loading");
  console.log(this.channelMessages);
  console.log("channel Messages finished loading");
}

send(event : string)
{

  let channelMessage : ChannelMessage ={
    content: event
  };
  console.log(channelMessage.content);
  this.chatService.sendChannelChatMessage(this.channel.$key, channelMessage);
}

}
