import { Component, OnInit, Input } from '@angular/core';
import { GetOptionNameService } from '../../service/get-option-name.service';
import { GetBrowserNameService } from '../../service/get-browser-name.service';
import { ApiProviderService } from '../../service/api-provider.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {

  constructor(
    private getName: GetOptionNameService,
    private getBrowser: GetBrowserNameService,
    private api: ApiProviderService,
  ) {
  }

  balance: string;

  ngOnInit() {
    this.api.getResponse()
    .then(res =>{
      console.log(res);
      this.balance = res.result;
      console.log(this.balance);
    })
    .catch(err =>{
      console.log(err);
    })
  }

}
