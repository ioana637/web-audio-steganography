import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { WindowRef } from './windowref.service';
import { AudioService } from './services/audio.service';

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

  audioEncodeUrl: any = '../assets/Beethoven.wav';
  resultAudioUrl: any;

  fileTextContent: string | ArrayBuffer;

  constructor(private sanitizer: DomSanitizer,
    private audioService: AudioService,
    private winRef: WindowRef) {

  }

  ngOnInit() {
  }

  previewAudio(event) {
    this.fileAudio = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(<File>this.fileAudio);
    reader.onload = (_event) => {
      const blob = this.winRef.nativeWindow.URL || this.winRef.nativeWindow.webkitURL;
      this.audioEncodeUrl = blob.createObjectURL(this.fileAudio);
      document.getElementById('audioControlEncode').setAttribute('src', this.audioEncodeUrl);
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

  encodeWithLSB(){
    console.log('LSB');
  }

  encodeWithEchoHiding() {
    console.log('EchoHiding');

  }

}
