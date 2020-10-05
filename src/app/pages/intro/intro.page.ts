import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { INTRO_KEY } from 'src/app/guards/intro.guard';

import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
const { Storage } = Plugins;

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  next() {
    this.slides.slideNext();
  }
 
  //When we press the start button, we can set say that we have seen the intro and set that to true for the
  //intoguard to use
  async start() {
    await Storage.set({key: INTRO_KEY, value: 'true'});
    //then navigate to the login
    this.router.navigateByUrl('/login', { replaceUrl:true });
  }
}


