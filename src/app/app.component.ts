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

  fileAudio: File = null;
  fileText: File = null;
  audioType = 'data:audio/mpeg;base64,';

  msbapTitle = 'Audio';
  msbapAudioUrl: any = '../assets/Beethoven.wav';

  msbapDisplayTitle = true;
  msbapDisplayVolumeControls = true;
  audio: HTMLAudioElement;
  fileTextContent: string | ArrayBuffer;

  constructor(private sanitizer: DomSanitizer,
    private winRef: WindowRef) {

  }

  ngOnInit() {
    this.audio = document.createElement("audio");
  }

  previewAudio(event) {
    this.fileAudio = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(<File>this.fileAudio);
    reader.onload = (_event) => {
      const blob = this.winRef.nativeWindow.URL || this.winRef.nativeWindow.webkitURL;
      this.msbapAudioUrl = blob.createObjectURL(this.fileAudio);
      document.getElementById('audioControl').setAttribute('src', this.msbapAudioUrl);
    }
  }

  previewText(event) {
    this.fileText = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.fileTextContent = fileReader.result;
    }
    fileReader.readAsText(this.fileText);
  }

}
