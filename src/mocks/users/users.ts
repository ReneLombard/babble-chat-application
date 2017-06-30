import {Message} from '../../models/messages/message.interface';
import {Profile} from '../../models/profile/profile.interface';

const profileList : Profile[] = [
    {
        firstName : 'René',
        lastName : 'Lombard',
        email : 'lombard.ernest.rene@gmail.com',
        avatar: 'assets/avatar.jpg',
        dateOfBirth : new Date()
   },
      {
        firstName : 'Werner',
        lastName : 'Strauss',
        email : 'werner.strauss@sage.com',
        avatar: 'assets/avatar.jpg',
        dateOfBirth : new Date()
   }


];

export const USER_LIST = profileList;
