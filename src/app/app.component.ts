import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { WindowRef } from './windowref.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'web-audio-steganography';

  file: File = null;
  audioType = 'data:audio/mpeg;base64,';

  msbapTitle = 'Audio';
  msbapAudioUrl: any = '../assets/Beethoven.wav';

  msbapDisplayTitle = true;
  msbapDisplayVolumeControls = true;
  audio: HTMLAudioElement;
  constructor(private sanitizer: DomSanitizer,
    private winRef: WindowRef) {

  }

  ngOnInit() {
    this.audio = document.createElement("audio");
  }

  previewAudio(event) {
    this.file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(<File>this.file);
    reader.onload = (_event) => {
      const blob = this.winRef.nativeWindow.URL || this.winRef.nativeWindow.webkitURL;
      this.msbapAudioUrl = blob.createObjectURL(this.file);
        // console.log('File name: '+this.file.name);
        // console.log('File type: '+this.file.type);
        // console.log('File BlobURL: '+ this.msbapAudioUrl);
        document.getElementById('audioControl').setAttribute('src', this.msbapAudioUrl);
    }
  }

}
