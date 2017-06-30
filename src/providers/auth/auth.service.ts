import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Account} from '../../models/account/account.interface';
import {LoginResponse} from '../../models/login/login-response.interface';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthService {


  constructor(private afauth : AngularFireAuth) {

  }

  getAuthenticatedUser()
  {
    return this.afauth.authState;
  }
  async signWithEmailAndPassword(account: Account)
  {
     try {
      return <LoginResponse>({result : await this.afauth.auth.signInWithEmailAndPassword(account.email, account.password)});

    }
    catch (e)
    {
      return <LoginResponse>({error : e});
    }
  }

  async createUserByEmailAndPassword(account: Account)
  {
    try {
      return <LoginResponse>({
        result: await this.afauth.auth.createUserWithEmailAndPassword(account.email,account.password)
      });
    }
    catch (e) {
      return ( <LoginResponse>({
        error:e}));
    }
  }
  signOut()
  {
    this.afauth.auth.signOut();
  }

}
