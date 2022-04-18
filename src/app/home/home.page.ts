import { Component, OnInit, Input } from '@angular/core';
import { NavController, AlertController, ToastController, ModalController, LoadingController, IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { GetOptionNameService } from '../service/get-option-name.service';
import { GetBrowserNameService } from '../service/get-browser-name.service';
import { ApiProviderService } from '../service/api-provider.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  modName: string = 'account';
  actName: string = 'balance';
  optName: string = null;

  ShowBlance: boolean = true;
  ShowBlancemulti: boolean = false;
  ShowTxlist: boolean = false;
  ShowTxlistinternal: boolean = false;
  ShowTokentx: boolean = false;
  ShowTokennfttx: boolean = false;
  ShowContract: boolean = false;
  ShowGetminedblocks: boolean = false;

  address: string = null;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private getName: GetOptionNameService,
    private getBrowser: GetBrowserNameService,
    private api : ApiProviderService,
  ) {}

  resName: string;

  ngOnInit(){
    //
    this.getBrowser.isBrowser()
    .then(res =>{
      const userAgent = navigator.userAgent;
      this.userAgent = userAgent;
      this.browserName = res;
    });
    //
    this.getName.funcObservable(this.actName, this.optName)
    .subscribe(data =>{
      console.log(data);
      this.resName = data;
    })
  }

  //
  userAgent: string;
  browserName: string = null;
  showPasteBtn: boolean = true;

  getModule(event){
    console.log(event);
  }

  getAction(event){
    console.log('getAction =>', event.detail.value);
    const value = event.detail.value;
    this.actName = value;
    if(value == 'balance'){
      this.ShowBlance = true;
      this.ShowBlancemulti = false;
      this.ShowTxlist = false;
      this.ShowTxlistinternal = false;
      this.ShowTokentx = false;
      this.ShowTokennfttx = false;
      this.ShowGetminedblocks = false;
    } else if(value == 'balancemulti'){
      this.ShowBlance = false;
      this.ShowBlancemulti = true;
      this.ShowTxlist = false;
      this.ShowTxlistinternal = false;
      this.ShowTokentx = false;
      this.ShowTokennfttx = false;
      this.ShowGetminedblocks = false;
    } else if(value == 'txlist'){
      this.ShowBlance = true;
      this.ShowBlancemulti = false;
      this.ShowTxlist = true;
      this.ShowTxlistinternal = false;
      this.ShowTokentx = false;
      this.ShowTokennfttx = false;
      this.ShowGetminedblocks = false;
    } else if(value == 'txlistinternal'){
      this.ShowBlance = true;
      this.ShowBlancemulti = false;
      this.ShowTxlist = false;
      this.ShowTxlistinternal = true;
      this.ShowTokentx = false;
      this.ShowTokennfttx = false;
      this.ShowGetminedblocks = false;
      //
      this.ShowTxAddress = true;
      this.getName.funcObservable(value)
      .subscribe(data =>{
        console.log(data);
        this.actName = data;
      })
    } else if(value == 'tokentx'){
      this.ShowBlance = true;
      this.ShowBlancemulti = false;
      this.ShowTxlist = false;
      this.ShowTxlistinternal = false;
      this.ShowTokentx = true;
      this.ShowTokennfttx = false;
      this.ShowGetminedblocks = false;
    } else if(value == 'tokennfttx'){
      this.ShowBlance = true;
      this.ShowBlancemulti = false;
      this.ShowTxlist = false;
      this.ShowTxlistinternal = false;
      this.ShowTokentx = false;
      this.ShowTokennfttx = true;
      this.ShowGetminedblocks = false;
    } else if(value == 'getminedblocks'){
      this.ShowBlance = true;
      this.ShowBlancemulti = false;
      this.ShowTxlist = false;
      this.ShowTxlistinternal = false;
      this.ShowTokentx = false;
      this.ShowTokennfttx = false;
      this.ShowGetminedblocks = true;
    }
    if(value == 'tokentx' || value == 'tokennfttx'){
      this.ShowContract = true;
      this.ShowTxAddress = true;
      this.ShowTxhash = false;
    } else {
      this.ShowContract = false;
      this.ShowTxAddress = false;
      this.ShowTxhash = false;
    }
    if(value == 'balancemulti'){
      this.tagName = 'earliest';
    } else {
      this.tagName = null;
    }
  }

  tagName: string = null;
  getTag(event){
    const value = event.detail.value;
    this.tagName = value;
    // console.log('tagName =>', this.tagName);
  }

  startblk: number = 0;
  endblk: number = 99999999999;
  pageNum: number = 1;
  offsetNum: number = 10;
  sortName: string = 'asc';
  blocktypeName: string = 'blocks';
  getSort(event){
    const value = event.detail.value;
    this.sortName = value;
    console.log('sortName =>', this.sortName);
  }

  ShowTxAddress: boolean = false;
  ShowTxhash: boolean = false;
  // ShowBlockRange: boolean = false;
  txhash: string = null;
  getOption(event){
    console.log('getOption =>', event.detail.value);
    const value = event.detail.value;
    if(value == 'txAddress'){
      this.ShowTxAddress = true;
      this.ShowTxhash = false;
      // this.ShowBlockRange = false;
    } else if(value == 'txhash'){
      this.ShowTxAddress = false;
      this.ShowTxhash = true;
      // this.ShowBlockRange = false;
    } else if(value == 'blockRange'){
      this.ShowTxAddress = true;
      this.ShowTxhash = false;
      // this.ShowBlockRange = true;
    }
    this.getName.funcObservable(value)
    .subscribe(data =>{
      console.log(data);
      this.optName = data;
    })
  }

  // 以下、balance用のアドレス関連

  pastAdresBtn: boolean = true;
  deleteAdresBtn: boolean = false;
  funcAdresPaste(){
    // https://developer.mozilla.org/ja/docs/Web/API/Navigator/clipboard
    navigator.clipboard.readText()
    .then(res => {
      // console.log(res);
      this.address = res;
      this.pastAdresBtn = false;
      this.deleteAdresBtn = true;
    })
  }

  funcAdresDelete(){
    this.address = null;
    this.pastAdresBtn = true;
    this.deleteAdresBtn = false;
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  // 以下、balancemultiに関するもの

  pastAdresMultiBtn: boolean = true;
  deleteAdresMultiBtn: boolean = false;
  addressMulti: string = null;
  funcAdresMultiPaste(){
    this.count();
    navigator.clipboard.readText()
    .then(res =>{
      if(this.addressMulti){
        this.addressMulti = this.addressMulti + ',' + res;
      } else {
        this.addressMulti = res;
      }
    })
  }

  countNum: number = 0;
  count(){
    this.countNum = ++this.countNum;
    console.log(this.countNum);
    if(this.countNum == 20){
      this.pastAdresMultiBtn = false;
      this.deleteAdresMultiBtn = true;
    }
  }

  funcAdresMultiDelete(){
    this.countNum = 0;
    this.addressMulti = null;
    this.pastAdresMultiBtn = true;
    this.deleteAdresMultiBtn = false;
  }

  // 以下、contract address用のテキストボックス関連

  contractAdres: string = null;
  pastContractBtn: boolean = true;
  deleteContractBtn: boolean = false;
  funcContractPaste(){
    navigator.clipboard.readText().then(res => {
      // console.log(res);
      this.contractAdres = res;
      this.pastContractBtn = false;
      this.deleteContractBtn = true;
    })
  }

  funcContractDelete(){
    this.contractAdres = null;
    this.pastContractBtn = true;
    this.deleteContractBtn = false;
  }

  // 以下、txhash用のテキストボックス関連

  txhashValue: string = null;
  pasteTxhashBtn: boolean = true;
  deleteTxhashBtn: boolean = false;
  funcTxhashPaste(){
    navigator.clipboard.readText().then(res => {
      // console.log(res);
      this.txhashValue = res;
      this.pasteTxhashBtn = false;
      this.deleteTxhashBtn = true;
    })
  }

  funcTxhashDelete(){
    this.txhashValue = null;
    this.pasteTxhashBtn = true;
    this.deleteTxhashBtn = false;
  }

  submit(){
    console.log('submit =>', this.actName);
    this.api.submitParam(
      this.actName, this.address,
      this.addressMulti, this.tagName,
      this.optName ,this.startblk, this.endblk, this.pageNum, this.offsetNum, this.sortName, this.txhashValue,
      this.contractAdres,
      this.blocktypeName
    )
    .then(res =>{
      console.log(res);
      this.navCtrl.navigateForward('response');
    })
    // this.api.getBalance(this.actName, this.address, this.tagName)
    // .then(res =>{
    //   console.log(res);
    // })
  }


}
