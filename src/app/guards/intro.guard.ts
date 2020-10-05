import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';

//Import capacitor storage
import {Plugins} from '@capacitor/core';
const {Storage} = Plugins;

//Export a 'key' to say the intro has been seen
export const INTRO_KEY = 'intro-seen';


@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanLoad {

  constructor(private router: Router){};
  //Canload returns an promise
  //Have we seen the intro page?
  async canLoad(): Promise<boolean> {

    //Check if the user has seen the intro
    const hasSeenIntro = await Storage.get({key: INTRO_KEY})
    //hasSeenIntro is the key we get back, which in turn has a key called value - which is the real value.
    //Capacitor stores values as strings, so check for true.
    //This also prevents people from being able to press the back button to go back to the intro page.
    if(hasSeenIntro && (hasSeenIntro.value) === 'true'){

      //Have the authguard return true, as the user should be allowed navigate if theyre logged in
      return true;

    }else {

      //Return true in the other case also, as the user shouldn't navigateto the login,
      //but instead we will navigate to the introduction.
      //ReplaceURL resets the navigation stack
      this.router.navigateByUrl('/intro', { replaceUrl: true});
      return false;

    }
    
  }
}
