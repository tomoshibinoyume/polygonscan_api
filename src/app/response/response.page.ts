import { Component, OnInit, Input } from '@angular/core';
import { NavController, AlertController, ToastController, ModalController, LoadingController, IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { GetOptionNameService } from '../service/get-option-name.service';
import { GetBrowserNameService } from '../service/get-browser-name.service';
import { ApiProviderService } from '../service/api-provider.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.page.html',
  styleUrls: ['./response.page.scss'],
})
export class ResponsePage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private getName: GetOptionNameService,
    private getBrowser: GetBrowserNameService,
    private api : ApiProviderService,
  ) {
  }

  ngOnInit() {
    this.api.getResponse()
    .then(res =>{
      console.log(res);
    })
    .catch(err =>{
      console.log(err);
      this.pageBack();
    })
  }

  pageBack(){
    this.navCtrl.navigateBack('home');
  }


}
