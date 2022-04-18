import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetBrowserNameService {

  browserName: string = null;

  constructor() { }

  isBrowser(): Promise<any>{
    return new Promise(resolve =>{
      // UserAgentからのスマホ判定
      const userAgent = navigator.userAgent;
      if (userAgent.match(/Firefox/)) {
        this.browserName = ' => firefox';
        resolve(this.browserName);
      } else if(userAgent.match(/OPR/) && userAgent.match(/Android/)) {
        this.browserName = ' => Android-Opera';
        resolve(this.browserName);
      } else if(userAgent.match(/OPM/) && userAgent.match(/Android/)) {
        this.browserName = ' => Android-Safari';
        resolve(this.browserName);
      } else {
        resolve(this.browserName);
      }
    })
  }


}
