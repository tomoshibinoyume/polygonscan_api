import { Injectable } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, AlertController, ToastController, ModalController, LoadingController, IonContent } from '@ionic/angular';
import { GetOptionNameService } from './get-option-name.service';

@Injectable({
  providedIn: 'root'
})
export class ApiProviderService implements OnInit{

  constructor(
    public http: HttpClient,
    private gon: GetOptionNameService,
  ) {

  }

  optName: string;
  resName: string;

  ngOnInit(){
    this.gon.getOptionName()
    .subscribe(res =>{
      this.resName = res;
      console.log('resName =>', this.resName);
      if(res == 'txAddress' || res == 'txhash' || res == 'blockRange'){
        this.optName = res;
        console.log('optName =>', this.optName);
      }
    })
  }

  apiUrl: string = 'https://api.polygonscan.com/api';
  key: string = 'EDZ7YT7WJGEVFJ8EHBY4E8BSFRUXWJKXD9';
  resArray: any;

  submitParam(
    act, adres?,
    multi?, tag?,
    opt?, start?, end?, page?, offset?, sort?, txhash?,
    contrxt?,
    blktype?
  ): Promise<any>{
    return new Promise((resolve, reject) =>{
      let url = this.apiUrl + '?module=account' + '&apikey=' + this.key;
      if(act == "balance"){
        console.log('submitParam balance');
        url = url + '&address=' + adres + '&action=' + act;
      } else if(act == "balancemulti"){
        console.log('submitParam balancemulti');
        url = url + '&address=' + multi + '&action=' + act + '&tag=' + tag;
      } else if(act == "txlist") {
        console.log('submitParam txlist');
        url = url + '&address=' + adres + '&action=' + act + '&startblock=' + start + '&endblock=' + end + '&page=' + page + '&offset=' + offset + '&sort=' + sort;
      } else if(act == "txlistinternal" && opt == "txAddress"){
        console.log('submitParam txlistinternal by address');
        url = url + '&address=' + adres + '&action=' + act + '&startblock=' + start + '&endblock=' + end + '&page=' + page + '&offset=' + offset + '&sort=' + sort;
      } else if(act == "txlistinternal" && opt == "txhash"){
        console.log('submitParam txlistinternal by txhash');
        url = url + '&' + opt + '=' + txhash + '&action=' + act;
      } else if(act == "txlistinternal" && opt == "blockRange"){
        console.log('submitParam txlistinternal by blockRange');
        url = url + '&action=' + act + '&startblock=' + start + '&endblock=' + end + '&page=' + page + '&offset=' + offset + '&sort=' + sort;
      } else if(act == "tokentx"){
        console.log('submitParam tokentx');
        url = url+ '&address=' + adres + '&contractaddress=' + contrxt + '&action=' + act + '&startblock=' + start + '&endblock=' + end + '&page=' + page + '&offset=' + offset + '&sort=' + sort;
      } else if(act == "tokennfttx"){
        console.log('submitParam tokennfttx');
        url = url+ '&address=' + adres + '&contractaddress=' + contrxt + '&action=' + act + '&startblock=' + start + '&endblock=' + end + '&page=' + page + '&offset=' + offset + '&sort=' + sort;
      } else if(act == "getminedblocks"){
        console.log('submitParam getminedblocks')
        url = url+ '&address=' + adres + '&action=' + act + '&page=' + page + '&offset=' + offset + '&blocktype=' + blktype;
      }
      console.log(url);
      this.http.get(url)
      .subscribe(res =>{
        console.log(res);
        this.resArray = res;
        resolve(this.resArray);
      })
    })
  }

  getResponse(): Promise<any>{
    return new Promise((resolve, reject) =>{
      if(this.resArray){
        resolve(this.resArray);
      } else {
        reject('no response => page back');
      }
    })
  }

}
