import { Component, EventEmitter, Output } from '@angular/core';
import { DataService } from "../../providers/data/data.service";
import { Profile } from "../../models/profile/profile.interface";

/**
 * Generated class for the ProfileSearchComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'app-profile-search',
  templateUrl: 'profile-search.component.html'
})
export class ProfileSearchComponent {

  private query: string;

  profileList: Profile[];

  @Output() profileEmitter : EventEmitter<Profile>; 
  constructor(private data: DataService) {
    this.profileEmitter = new EventEmitter<Profile>();
  }
  searchUser(query: string) {
    const trimmedQuery = query.trim();
    if (trimmedQuery === query) {
      this.data.searchUser(query).subscribe(profiles => {

        this.profileList = profiles;
      });
    }
  }
  selectedProfile(profile : Profile)
  {
    this.profileEmitter.emit(profile);
  }
}
