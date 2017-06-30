import { Component, EventEmitter, Output } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Account } from '../../models/account/account.interface';
import { LoginResponse } from '../../models/login/login-response.interface';
import { ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth.service';


/**
 * Generated class for the RegisterFormComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'app-register-form',
  templateUrl: 'register-form.component.html'
})
export class RegisterFormComponent {


  account = {} as Account;
  @Output() registerStatus: EventEmitter<LoginResponse>;

  constructor(private auth : AuthService ,private toast: ToastController,  public navCtrl: NavController) {
    this.registerStatus = new EventEmitter<LoginResponse>();
  }

  async Register() {
    

    const result  = await this.auth.createUserByEmailAndPassword(this.account);
    this.registerStatus.emit(result );


      // var item = <LoginResponse>({
      //   result: await this.fbauth.auth.createUserWithEmailAndPassword(this.account.email, this.account.password)
      // });
      // this.registerStatus.emit(item);
    
  }
}
