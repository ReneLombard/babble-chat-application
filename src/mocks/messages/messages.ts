import {Message} from '../../models/messages/message.interface';
import {Profile} from '../../models/profile/profile.interface';
import {USER_LIST} from '../users/users'

const userList = USER_LIST;
const messageList : Message[] = []; 

// userList.forEach((user) => {
//     messageList.push({ user : user, date: new Date(), lastMessage : 'Hello'});
//     messageList.push({ user : user, date: new Date(), lastMessage : 'Hello'});
//       messageList.push({ user : user, date: new Date(), lastMessage : 'Hello'});
//     messageList.push({ user : user, date: new Date(), lastMessage : 'Hello'});

// } )
export const MESSAGE_LIST = messageList ; 