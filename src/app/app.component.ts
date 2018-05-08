import {
  Component
} from '@angular/core';
import {
  HttpService
} from './helper/http.service';

import {
  environment
} from '../environments/environment';

import {
  Router,
  ActivatedRoute,
  ParamMap
} from '@angular/router';
import {
  NullTemplateVisitor
} from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  code = null;
  state = null;
  url = 'https://medium.com/m/oauth/authorize?client_id=9964c11e229b&scope=basicProfile,listPublications,publishPost&state=testing&response_type=code&redirect_uri=' + environment.return_url; //https://mediumviewer.firebaseapp.com
  token_type = null;
  access_token = null;
  refresh_token = null;
  scope = null;
  expires_at = null;
  profile: any = null;
  publication: any = null;

  constructor(public api: HttpService, public router: Router, ) {
    // this.api.get(this.url, '');
    //   // console.log(this.activatedRoute)
    //   this.activatedRoute.params.subscribe(params => {

    // });
    // // console.log(this.getParameterByName('code'), 'TEST');
    // let checklogin = localStorage.get('TokenMedium');
    // if (checklogin) {
    //   checklogin = JSON.parse(checklogin);
    // } else {
    //   checklogin = null;
    // }
    if ((this.getParameterByName('code') && this.getParameterByName('state'))) {
        this.code = this.getParameterByName('code') || localStorage.getItem('code');
        this.state = this.getParameterByName('state') || localStorage.getItem('state');
        this.getToken();
    } else if (localStorage.getItem('TokenMedium')) {
      this.getProfilePublic();
    } else {
      this.code = null;
      this.state = null;
    }
  }
  getToken() {
    const data = `code=${this.code}&client_id=${environment.client_id}&client_secret=${environment.client_secret}&grant_type=authorization_code&redirect_uri=${encodeURIComponent(environment.return_url)}`;
    // console.log('data:', data);
    this.api.medium_api_post('/v1/tokens', data).subscribe(res => {
      // console.log(res, 'RES DATA');
      localStorage.setItem('TokenMedium', JSON.stringify(res));
      this.token_type = res.token_type;
      this.access_token = res.access_token;
      this.refresh_token = res.refresh_token;
      this.scope = res.scope;
      this.expires_at = res.expires_at;
      this.getProfilePublic();
      this.router.navigate(['/index']);
    });
  }
  logout() {
    localStorage.removeItem('TokenMedium');
    this.token_type = null;
    this.access_token = null;
    this.refresh_token = null;
    this.scope = null;
    this.expires_at = null;
    location.reload();
  }
  getProfilePublic() {
    if (localStorage.getItem('TokenMedium')) {
      const res = JSON.parse(localStorage.getItem('TokenMedium'));
      this.token_type = res['token_type'];
      this.access_token = res['access_token'];
      this.refresh_token = res['refresh_token'];
      this.scope = res['scope'];
      this.expires_at = res['expires_at'];
    }
    const to = `${this.token_type} ${this.access_token}`;
    // console.log(to,'TOEKN');
    const data2 = {
      token: to,
      path: '/v1/me'
    };
    this.api.post_test('/api', data2).subscribe(res_user => {
      // console.log(res_user, 'RES USER');
      this.profile = res_user.data;
      data2.path = '/v1/users/' + this.profile.id + '/publications';
      this.api.post_test('/api', data2).subscribe(pub => {
        // console.log(pub);
        this.publication = pub;
      });
    });
  }
  getParameterByName(name) {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
}
