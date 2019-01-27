import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ServerService {
  constructor(private http: Http) {}

  storeServers(servers: any[]) {
    // const headers = new Headers({'Content-Type': 'application/json'});
    // return this.http.post('https://udemy-ng-http-df64d.firebaseio.com/data.json', servers,
    // {headers: headers});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('https://udemy-ng-http-df64d.firebaseio.com/data.json', servers,
    {headers: headers});
  }

  getServers() {
    return this.http.get('https://udemy-ng-http-df64d.firebaseio.com/data.json')
      .map(
        (response: Response) => {
          const data = response.json();
          for (const server of data) {
            server.name = 'FETCHED_' + server.name;
          }
          return data;
        }
      )
      .catch(
        (error: Response) => {
          //console.log(error);
          return Observable.throw('Something went wrong');
        }
      );
  }

  getAppName() {
    return this.http.get('https://udemy-ng-http-df64d.firebaseio.com/data/appName.json')
      .map(
        (response: Response) => {
          //console.log('response json is: ' + response.json()); //response json is: Http Test
          return response.json();
        }
      );
  }
}
