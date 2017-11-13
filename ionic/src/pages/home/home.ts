import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import * as io from 'socket.io-client';
import { Http } from '@angular/http';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
import { ConfigurationPage } from '../configuration/configuration';

import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage { 
    public base64Image: string;
    socket:any;
    serverKO:boolean;

    //userId:string;
    //email:string;
    loading: Loading;
    result: string;
    constructor(public navCtrl: NavController, private camera: Camera, public http: Http, public navParams: NavParams, public loadingCtrl: LoadingController) {
        //var token = this.navParams.get("token");
        this.serverKO = true; 
        this.socket = io('https://translator-node.slapps.fr');
        this.socket.emit('message', "hello from client");
        this.socket.on('progress', (progress) => {
            console.log("progress:",progress);
            if(progress.progress){
                this.loading.setContent(progress.status+"-"+Math.round(progress.progress*100)+"%");
            }else{
                this.loading.setContent(progress.status);
            }
        });
        this.socket.on('result', (result) => {
            console.log("result:",result);
            this.loading.dismissAll()
            this.result = result;
        });
        this.socket.on('status', (status) => {
            console.log("status",status);
            this.serverKO = false; 
        });

        this.socket.on('message', (msg) => {

            console.log("message", msg);
        });
        //this.userId = this.navParams.get("userId");
        //this.email= this.navParams.get("email");
        //console.log("USERID:"+this.userId);
    }
    cam(){
        //var test = this.camera.PictureSourceType.CAMERA; 
        var options: CameraOptions = {
            //quality: 5,
            destinationType: this.camera.DestinationType.FILE_URI, 
            sourceType: 0,
            targetWidth: 100,
            targetHeight: 100,
        };
        this.camera.getPicture(options).then((imageData) => {
            //TODO reduce if JPEG ? 
            this.base64Image = "data:image/jpeg;base64," + imageData;
            
            //this.base64Image = imageData;
            //console.log(this.base64Image);
        }, (err) => {
            console.log(err);
        });
    }
    public uploadImage() {
        this.loading = this.loadingCtrl.create({
            content: 'Uploading file',
        });
        this.loading.present();
        console.log("sending image");
        this.socket.emit('image', this.base64Image);
        /*
        this.http.post("https://translator-node.slapps.fr/image",{
            image:this.base64Image,
        }).map(res => res.json())
            .subscribe(data => {
                this.loading.dismissAll()
                console.log(data);
                this.result = data.result;
            });
         */

    }

}
