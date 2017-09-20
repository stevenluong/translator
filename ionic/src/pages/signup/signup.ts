import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ConfigurationPage } from '../configuration/configuration';
import 'rxjs/add/operator/map'
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignupPage {
    email:string;
    password:string;
    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {
        this.email = "";
        this.password = "";
    }
    signup(){
        this.http.post("https://translator-loopback.slapps.fr/api/Users",{
            email:this.email,
            password:this.password
        }).subscribe(data=>{
            console.log(data);
            var userId = data.json().userId;
            this.navCtrl.setRoot(ConfigurationPage,{
userId:userId,
email:this.email
});
        });
    }
}
