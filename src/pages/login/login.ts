import { Component } from '@angular/core';
// import {DataService} from '../../providers/data/data.service';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginResponse } from '../../models/login/login-response.interface';
import { ToastController } from 'ionic-angular';
import { DataService } from "../../providers/data/data.service";
import { User } from "firebase/app";
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginResponse = {} as LoginResponse;
  constructor(private data: DataService, private toast: ToastController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(event: LoginResponse) {
    if (!event.error) {
      this.toast.create({
        message: `Welcome to Babble, ${event.result.email}`,
        duration: 3000
      }).present();
      this.data.getProfile(<User>event.result).subscribe(profile => { profile.val() ? this.navCtrl.setRoot('TabsPage') : this.navCtrl.setRoot('EditProfilePage') });
      this.navCtrl.setRoot('EditProfilePage');
    }
    else {
      this.toast.create({
        message: "Error: Please make check your username and password",
        duration: 3000
      }).present();
    }
    this.loginResponse = event;

  }
}
