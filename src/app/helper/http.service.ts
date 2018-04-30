import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
@Injectable()
export class HttpService {

  medium_url = environment.medium_url;

  constructor(private http: Http) { }

  get(url, data) {
    const convert_data = '';
    this.http.get(url + convert_data).subscribe(res =>
      console.log(res.text()));
  }
  post(url, data) {
    this.http.post(url, data).subscribe(res =>
      console.log(res.text()));
  }

  medium(url, data) {
    this.get(url, data);
  }

}
