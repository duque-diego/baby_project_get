
import { Http, Headers, Response, RequestOptions, RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { RestApiProvider, IRestApiCall,  } from '../../helpers/rest-api.provider';
import { UserModel } from '../../models/user-model';
import { LoginModel } from '../../models/login-model';
import { SERVER_API_URL } from '../../app/app.constants';

/*
  Generated class for the ApiBeneficiarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiUserProvider {

  constructor(public restApiService:RestApiProvider) {}

  registerUser(user: UserModel) {

    let call: IRestApiCall = {
      baseUrl: SERVER_API_URL,
      endpoint: "/api/usuario",
      body: JSON.stringify(user),
      headers: {"Content-Type": "application/json"},
      method: RequestMethod.Put
    }

    return this.restApiService.put(call)
      .map((data: any) => converterJsonParaUser(data));

  }

  loginUser(login: LoginModel) {

    let call: IRestApiCall = {
      baseUrl: SERVER_API_URL,
      endpoint: "/login",
      body: JSON.stringify(login),
      headers: {"Content-Type": "application/json"},
      method: RequestMethod.Post
    }
    return this.restApiService.post(call);
  }

  getUserData(email: String) {

    let call: IRestApiCall = {
      baseUrl: SERVER_API_URL,
      endpoint: "/api/usuario",
      body: null,
      headers: {"Content-Type": "application/json"},
      queryParams: { email: email },
      method: RequestMethod.Get
    }

    return this.restApiService.get(call);
  }

  updateUserData(user: UserModel) {

    let call: IRestApiCall = {
      baseUrl: SERVER_API_URL,
      endpoint: "/api/usuario",
      body: JSON.stringify(user),
      headers: {"Content-Type": "application/json"},
      method: RequestMethod.Put
    }
    return this.restApiService.put(call);
  }

}

function converterJsonParaUser(data:any): UserModel{

  let beneficiario:UserModel = new UserModel(data.id, data.nome, data.email, data.telefone, data.cpf, data.senha);

  return beneficiario;
}


