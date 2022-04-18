import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetOptionNameService {

  constructor() { }

  actionName: string;
  optionName: string;

  public funcObservable(act, opt?): Observable<any>{
    return new Observable(res =>{
      if(opt == 'txAddress' || opt == 'txhash' || opt == 'blockRange'){
        this.optionName = opt;
        res.next(this.optionName);
      } else {
        this.actionName = act;
        res.next(this.actionName);
      }
    })
  }

  getOptionName(): Observable<any>{
    return new Observable(res =>{
      if(this.optionName == 'txAddress' || this.optionName == 'txhash' || this.optionName == 'blockRange'){
        res.next(this.optionName);
      } else {
        res.next(this.actionName);
      }
    })
  }

}
