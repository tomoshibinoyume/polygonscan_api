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

  actionName: string;
  showBalance: boolean = false;
  showBlancemulti: boolean = false;
  showTxlist: boolean = false;

  ngOnInit() {
    this.getName.getOptionName()
    .subscribe(res =>{
      this.actionName = res;
      console.log(this.actionName);
      if(this.actionName == 'balance'){
        this.showBalance = true;
      } else if(this.actionName == 'balancemulti'){
        this.showBlancemulti = true;
      } else if(this.actionName == 'txlist'){
        this.showTxlist = true;
      } else {
        console.log('else');
      }
    })
    //
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
