import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'web-audio-steganography';

  msbapTitle = 'Audio';
  msbapAudioUrl = '../assets/Beethoven.wav';   
     
  msbapDisplayTitle = true; 
  msbapDisplayVolumeControls = true;
  constructor() {
    
  }

  ngOnInit() {
    
  }

}
