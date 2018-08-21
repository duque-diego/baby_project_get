import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RequestMethod } from "@angular/http";

export interface IRestApiCall {
  baseUrl: string;
  endpoint?: string;
  pathParams?: any;
  queryParams?: any;
  headers?: any;
  body?: any;
  method: RequestMethod;
}

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class RestApiProvider {

  constructor(public http: HttpClient) { }

  public doRequest(call: IRestApiCall) {

    const endpoint = this.buildRestEndpoint(call);
    const options = this.buildRequestOptions(call);

    if (call.method === RequestMethod.Get) {
      return this.http.get(endpoint, options);
    } else if (call.method === RequestMethod.Post) {
      return this.http.post(endpoint, call.body, options);
    } else if (call.method === RequestMethod.Patch) {
      return this.http.patch(endpoint, call.body, options);
    }
  }

  public get(call: IRestApiCall) {
    const endpoint = this.buildRestEndpoint(call);
    const options = this.buildRequestOptions(call);

    return this.http.get(endpoint, options);
  }

  public post(call: IRestApiCall) {
    const endpoint = this.buildRestEndpoint(call);
    const options = this.buildRequestOptions(call);

    return this.http.post(endpoint, call.body, options);
  }

  public put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(endpoint, body, reqOpts);
  }

  public delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(endpoint, reqOpts);
  }

  public patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(endpoint, body, reqOpts);
  }

  private buildRequestOptions(call: IRestApiCall): any {
    let headers: HttpHeaders;
    let queryParams: HttpParams;
    let requestOptions: any;

    if (call.headers) {
      headers = new HttpHeaders();
      Object.keys(call.headers).map((headerName) => {
        headers = headers.append(headerName, call.headers[headerName]);
      });
    }

    if (call.queryParams) {
      queryParams = new HttpParams();
      Object.keys(call.queryParams).map((paramName) => {
        queryParams = queryParams.append(paramName, call.queryParams[paramName]);
      });
    }

    if (headers || queryParams) {
      requestOptions = {
        headers,
        params: queryParams,
      };
    }

    return requestOptions;
  }

  private buildRestEndpoint(call: IRestApiCall): string {
    let endpoint = call.baseUrl + call.endpoint;
    const pathParams = call.pathParams;

    if (pathParams) {
      Object.keys(pathParams).map((nomeParam) => {
        const regex = new RegExp("\{" + nomeParam + "\}", "g");
        endpoint = endpoint.replace(regex, pathParams[nomeParam]);
      });
    }

    return endpoint;
  }

}
