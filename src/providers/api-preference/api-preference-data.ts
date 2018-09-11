
import { RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { RestApiProvider, IRestApiCall } from '../../helpers/rest-api.provider';
import { SERVER_API_URL } from '../../app/app.constants';

@Injectable()
export class ApiPreferenceProvider {

  constructor(public restApiService:RestApiProvider) {
  }

  getAllPreferences() {
    let call: IRestApiCall = {
      baseUrl: SERVER_API_URL,
      endpoint: "/api/preferencias",
      body: null,
      headers: {"Content-Type": "application/json"},
      method: RequestMethod.Get
    } 

    return this.restApiService.get(call);
  }

}