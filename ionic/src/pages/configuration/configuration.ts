import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import 'rxjs/add/operator/map'
@Component({
    selector: 'page-configuration',
    templateUrl: 'configuration.html'
})
export class ConfigurationPage {
    subject:string;
    message:string;
    recipient:string;
    templateId:number;
    userId:number;
    email:string;
    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {
        this.userId = this.navParams.get("userId");
        this.email= this.navParams.get("email");
        //TODO UPDATE VERY BAD
        this.http.get("https://redbutton-loopback.slapps.fr/api/Templates").map(res => res.json()).subscribe(data => {
            for(var i=0;i<data.length;i++){
                var t = data[i];
                if(t.userId==this.userId){
                    this.subject = t.subject;
                    this.message= t.message;
                    this.recipient= t.recipient;
                    this.templateId= t.id;
                    break;
                }
            }
        });
    }
    update(){
        this.http.put("https://redbutton-loopback.slapps.fr/api/Templates",{
            subject:this.subject,
            message:this.message,
            recipient:this.recipient,
            userId:this.userId,
            id:this.templateId
        }).subscribe(data=>{
            console.log(data);
            this.navCtrl.setRoot(HomePage,{
                userId:this.userId,
                email:this.email
            });
        });
    }

}
