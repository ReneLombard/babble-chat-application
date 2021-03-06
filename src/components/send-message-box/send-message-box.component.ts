import { Component, Output, EventEmitter } from '@angular/core';
import { ChannelMessage } from "../../models/channel/channel-message.interface";

/**
 * Generated class for the SendMessageBoxComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'app-send-message-box',
  templateUrl: 'send-message-box.component.html'
})
export class SendMessageBoxComponent {

  @Output() sendMessage : EventEmitter<string>;
  content : string;

  constructor() {
    this.sendMessage = new EventEmitter<string>();
  }
  send()
  {
    this.sendMessage.emit(this.content);
    this.content = "";
  }
}
