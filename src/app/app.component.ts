import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { WindowRef } from './windowref.service';
import { AudioService } from './services/audio.service';
import { Subscription } from 'rxjs';
import { fromBlobToFile } from './services/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'web-audio-steganography';

  fileAudio: File = null;
  fileText: File = null;
  audioType = 'data:audio/wav;base64,';

  audioEncodeUrl: any;
  resultAudioUrl: any;

  fileTextContent: string | ArrayBuffer;

  subscriptions: Subscription[] = [];

  stepByte: number;
  maximumValueForStep: number;
  bitIndex: number;
  delayEchoHiding = 0;

  constructor(private sanitizer: DomSanitizer,
    private audioService: AudioService,
    private winRef: WindowRef) {

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
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

  encodeWithLSB() {
    this.subscriptions.push(this.audioService.encodeWithLSB(this.fileAudio, this.fileText, this.bitIndex, this.stepByte).subscribe((res) => {
      this.processAudioResult(res);
    }, (err) => {
      console.log(err);
    }));
  }

  private processAudioResult(res: Blob) {
    const fileAudioResult = fromBlobToFile(res, 'result.wav', this.fileAudio.name);
    var reader = new FileReader();
    reader.readAsDataURL(<File>fileAudioResult);
    reader.onload = (_event) => {
      const blob = this.winRef.nativeWindow.URL || this.winRef.nativeWindow.webkitURL;
      this.resultAudioUrl = blob.createObjectURL(fileAudioResult);
      document.getElementById('audioControlResult').setAttribute('src', this.resultAudioUrl);
    };
  }

  encodeWithEchoHiding() {
    this.subscriptions.push(this.audioService.encodeWithEchoHiding(this.fileAudio, this.fileText, this.delayEchoHiding).subscribe((res) => {
      this.processAudioResult(res);
    }, (err) => {
      console.log(err);
    }));

  }

  changeStepByte(event) {
    if (this.fileAudio && this.fileText) {
      this.maximumValueForStep = this.fileAudio.size / (this.fileText.size * 8);
    }
  }

}
