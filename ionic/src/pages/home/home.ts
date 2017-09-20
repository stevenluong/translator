import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Http } from '@angular/http';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
import { ConfigurationPage } from '../configuration/configuration';

import { Camera } from '@ionic-native/camera';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage { 
    public base64Image: string;
    //userId:string;
    //email:string;
    loading: Loading;
    result: string;
    constructor(public navCtrl: NavController, private camera: Camera, public http: Http, public navParams: NavParams, public loadingCtrl: LoadingController) {
        //var token = this.navParams.get("token");
        //this.userId = this.navParams.get("userId");
        //this.email= this.navParams.get("email");
        //console.log("USERID:"+this.userId);
    }
    cam(){
        //var test = this.camera.PictureSourceType.CAMERA; 
        var options = {
            quality: 5,
            destinationType: 1, 
            sourceType: 0
        };
        this.camera.getPicture(options).then((imageData) => {
            this.base64Image = "data:image/jpeg;base64," + imageData;
            //this.base64Image = imageData;
            //console.log(this.base64Image);
        }, (err) => {
            console.log(err);
        });
    }
    goToSignup(){
        this.navCtrl.push(SignupPage);
    }
    goToLogin(){
        this.navCtrl.push(LoginPage);
    }
    goToConfiguration(){
        this.navCtrl.push(ConfigurationPage,{
            //userId:this.userId,
            //email:this.email
        });
    }
    public uploadImage() {
        this.loading = this.loadingCtrl.create({
                content: 'Uploading & Analysing...',
              });
        this.loading.present();
        this.http.post("https://translator-node.slapps.fr/image",{
            image:this.base64Image,
        }).map(res => res.json())
            .subscribe(data => {
            this.loading.dismissAll()
            console.log(data);
            this.result = data.result;
        });

    }

}
