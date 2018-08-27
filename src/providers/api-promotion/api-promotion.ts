
import { RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { RestApiProvider, IRestApiCall } from '../../helpers/rest-api.provider';

/*
  Generated class for the ApiBeneficiarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiPromotionProvider {

  constructor(public restApiService:RestApiProvider) {
  }

  getPromotions() {
    let call: IRestApiCall = {
      baseUrl: "/api",
      endpoint: "/api/promocoes",
      body: null,
      headers: {"Content-Type": "application/json"},
      method: RequestMethod.Get
    } 

    return this.restApiService.get(call);
  }

}