import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HttpService} from './helper/http.service';

import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IndexComponent } from './sub/index/index.component';

const appRoutes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: '*', component: AppComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [HttpModule, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
