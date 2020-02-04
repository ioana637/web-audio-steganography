import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { WindowRef } from './windowref.service';
import { AudioService } from './services/audio.service';
import { Subscription } from 'rxjs';
import { fromBlobToFile, drawBuffer } from './services/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'web-audio-steganography';

  fileAudio: File = null;
  fileAudioDecode: File = null;
  fileText: File = null;
  audioType = 'data:audio/wav;base64,';

  audioEncodeUrl: any;
  resultAudioUrl: any;

  fileTextContent: string | ArrayBuffer;

  subscriptions: Subscription[] = [];

  stepByte: number;
  maximumValueForStep: number;
  bitIndex: number;
  textLength: number;
  delayEchoHiding = 0;
  hiddenMessage ='';
  arrayBufferOriginalSound: any;

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
    reader.onload = (_event: any) => {
      const blob = this.winRef.nativeWindow.URL || this.winRef.nativeWindow.webkitURL;
      this.audioEncodeUrl = blob.createObjectURL(this.fileAudio);
      document.getElementById('audioControlEncode').setAttribute('src', this.audioEncodeUrl);
    }
  }

  previewAudioDecode(event){
    this.fileAudioDecode = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(<File>this.fileAudioDecode);
    reader.onload = (_event) => {
      const blob = this.winRef.nativeWindow.URL || this.winRef.nativeWindow.webkitURL;
      this.resultAudioUrl = blob.createObjectURL(this.fileAudioDecode);
      document.getElementById('audioControlDecode').setAttribute('src', this.resultAudioUrl);
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

  decodeWithLSB() {
    this.subscriptions.push(this.audioService.decodeWithLSB(this.fileAudioDecode, this.bitIndex, this.stepByte, this.textLength).subscribe((res) => {
      console.log(res);
      this.hiddenMessage = res;
    }, (err) => {
      console.log(err);
    }));
  }

  private processAudioResult(res: Blob) {
    this.fileAudioDecode = fromBlobToFile(res, 'result.wav', this.fileAudio.name);
    var reader = new FileReader();
    reader.readAsDataURL(<File>this.fileAudioDecode);
    reader.onload = (_event) => {
      const blob = this.winRef.nativeWindow.URL || this.winRef.nativeWindow.webkitURL;
      this.resultAudioUrl = blob.createObjectURL(this.fileAudioDecode);
      document.getElementById('audioControlResult').setAttribute('src', this.resultAudioUrl);
      document.getElementById('audioControlDecode').setAttribute('src', this.resultAudioUrl);
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

  previewAudioWaveform(event) {
    const file=event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = async (event: any) => {
      this.arrayBufferOriginalSound = event.target.result;
      this.arrayBufferOriginalSound = await new Response(file).arrayBuffer(); 
      drawBuffer(this.arrayBufferOriginalSound);
    }
    fileReader.readAsArrayBuffer(file);

  }

}
