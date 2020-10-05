import { Injectable } from '@angular/core';

import { Plugins } from '@capacitor/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
const { Storage } = Plugins;
import { map, tap, switchMap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

//Set another token key
const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  //Behaviour subject is different from Subject as it has an initial value - set as 'null' here.
  // 'null' filters out the first value in a guard
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';

  constructor(private http: HttpClient) { 

    this.loadToken();


  }

  //Load the token once the application starts
  async loadToken(){

  }

  canCall(){
    console.log("Can at least call the auth service? isAuthenticated seems to be " + this.isAuthenticated.value);
  }

  //The credentials the api expects are email and password
  login(credentials: {email, password}): Observable<any> {
    //Make a post request to the api, it returns an odd token, so we need to pipe it to something more maneagable
    return this.http.post(`https://reqres.in/api/login`, credentials).pipe(
      map((data: any) => data.token),
      //Switchmap means you switch from the original observable to a new observable
      switchMap(token => {
        //from transforms a promise to an observable
        return from(Storage.set({key: TOKEN_KEY, value: token}));
      }),
      // 'do' is known as ''tap' in a pipeble observable
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({key: TOKEN_KEY});
  }

  
}
