import { Component, EventEmitter, Output } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Account } from '../../models/account/account.interface';
import { LoginResponse } from '../../models/login/login-response.interface';
import { ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: 'login-form.component.html'
})
export class LoginFormComponent {


  @Output() loginStatus: EventEmitter<LoginResponse>;

  account = {} as Account;
  
  constructor(private auth : AuthService ,private toast: ToastController,  public navCtrl: NavController) {
    this.loginStatus = new EventEmitter<LoginResponse>();
  }

  async Login() {
   
    const result  = await this.auth.signWithEmailAndPassword(this.account);
    this.loginStatus.emit(result );

  }
  
  NavigateToRegisterPage() {
    this.navCtrl.push('RegisterPage');

  }


}
