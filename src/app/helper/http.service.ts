import {
  Injectable
} from '@angular/core';
import {
  Http,
  Response,
  RequestOptions,
  RequestMethod,
  Headers
} from '@angular/http';
import {
  HttpHeaders
} from '@angular/common/http';
import {
  environment
} from '../../environments/environment';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/Rx';
@Injectable()
export class HttpService {

  medium_url = environment.medium_url;
  medium_api = environment.medium_api;

  constructor(private http: Http) {}

  get(url, data) {
    const convert_data = '';
    // this.http.get(url + convert_data).map((res: Response) => res)
    // const headers = new Headers({
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept, Origin, Authorization',
    //   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    //   'Access-Control-Allow-Origin': '*'
    // });
    return this.http.get(url, {
      // headers: headers
    }).subscribe(res =>
      console.log(res.text())
    );


  }
  post(url, data) {
    const head = new Headers();
    head.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({
      headers: head
    });
    return this.http.post(url, data, options)
      .map((res: Response) => res.json());

  }

  post_test(path, type = '', token = '') {
    const to = `${type} ${token}`;
    const head = new Headers();
    head.append('Content-Type', 'application/json');
    // head.append('Authorization', `${to}`);
    const options = new RequestOptions({
      headers: head
    });
    console.log(this.medium_api + path);
    const data = {
      token: to,
      path: path
    };
    return this.http.post(environment.nodejs + '/api', data, options)
      .map((res: Response) => res);

  }

  medium_api_get(path, data) {
    this.get(this.medium_api + path, data);
  }
  medium_api_post(path, data) {
    return this.post(this.medium_api + path, data);
  }


  medium_api_get_user(path, type = '', token = '') {

    // let headers = new HttpHeaders();

    const to = `${type} ${token}`;
    // headers = headers.set('authentication', `${to}`);

    const headers = new Headers();
    // const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const head = new Headers();
    head.append('Content-Type', 'application/x-www-form-urlencoded');
    head.append('Authorization', `${to}`);
    const options = new RequestOptions({
      headers: head
    });
    return this.http.post(this.medium_api + path, null,options).map((res: Response) => res.json());





    // const head = new Headers();
    // head.append('Content-Type', 'application/json');
    // console.log(this.medium_api + path + '?Authorization=' + encodeURIComponent(to));
    // return this.http.get(this.medium_api + path + '?Authorization=' + encodeURIComponent(to), options)
    //   .map((res: Response) => res.json());
  }

}
