import { DataService } from '../../providers/data/data.service';

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FirebaseListObservable } from "angularfire2/database";
import { Profile } from "../../models/profile/profile.interface";

@Component({
  selector: 'app-online-users',
  templateUrl: 'online-users.component.html'
})
export class OnlineUsersComponent implements OnInit {

  userList : FirebaseListObservable<Profile[]>;
  @Output() userSelected  : EventEmitter<Profile>;
  constructor(private data: DataService) {
    this.userSelected = new EventEmitter<Profile>();
  }
  setUserOnline() {
    this.data.getAuthenticatedUserProfile().subscribe(profile => {
      this.data.setUserOnline(profile);
    });

  }
  getUsers()
  {
    this.userList = this.data.getOnlineUsers();
  }
   ngOnInit()
   {
      this.setUserOnline();
      this.getUsers(); 
   }
   openChat(profile: Profile)
   {
      this.userSelected.emit(profile);
   }
}
