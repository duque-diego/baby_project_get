
import { RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { RestApiProvider, IRestApiCall } from '../../helpers/rest-api.provider';
import { SERVER_API_URL } from '../../app/app.constants';

/*
  Generated class for the ApiBeneficiarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiPromotionProvider {

  constructor(public restApiService:RestApiProvider) {
  }

  getPromotions(userId: number) {
    let call: IRestApiCall = {
      baseUrl: SERVER_API_URL,
      endpoint: "/api/promocoes-app",
      body: null,
      queryParams: { userId: userId },
      headers: {"Content-Type": "application/json"},
      method: RequestMethod.Get
    } 

    return this.restApiService.get(call);
  }

}