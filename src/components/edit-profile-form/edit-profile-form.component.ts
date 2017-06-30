import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { User } from 'firebase/app';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { Profile } from '../../models/profile/profile.interface';

import { AuthService } from "../../providers/auth/auth.service";
import { DataService } from "../../providers/data/data.service";


@Component({
  selector: 'app-edit-profile-form',
  templateUrl: 'edit-profile-form.component.html'
})
export class EditProfileFormComponent implements OnInit,OnDestroy {


  @Input() profile  : Profile;
  private authenticatedUser: User;
  private authenticatedUser$: Subscription;


  constructor(private data: DataService, private auth: AuthService, public navCtrl: NavController) {
    this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe((user: User) => {
      this.authenticatedUser = user;
    }
    );
  }



  async saveProfile() {
    if (this.authenticatedUser) {
      this.profile.email = this.authenticatedUser.email;
      const result = await this.data.saveProfile(this.authenticatedUser, this.profile);
      this.navCtrl.push('TabsPage');
      console.log(result);
    }

  }

  ngOnDestroy(): void {
    this.authenticatedUser$.unsubscribe();
  }
  ngOnInit() : void {
    if(!this.profile)
    {
      this.profile = {} as Profile;
    }
  }
}
