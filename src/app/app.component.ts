import { Component } from '@angular/core';
import { FileService } from './file.service';

import Speech from 'speak-tts'
// var speaktts = require('speak-tts')

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'translator';

  configvar:any = { name: null, age: null}
  flag:any = 0
  word:any = { eng: null, tam: null, pron: null, syn: null }
  ipword:string = '';
  sent_flag:any = 0
  sent:any = {tam: null, pron: null}
  voice:any;
  speech = new Speech()
  

  constructor(private serv:FileService){

    this.speech.init({'lang': 'en-IN'}).then((data:any) => {
        // The "data" object contains the list of available voices and the voice synthesis params
        console.log("Speech is ready, voices are available", data)
        this.voice = data.voices[1]
    }).catch((e:any) => {
        console.error("An error occured while initializing : ", e)
    })   
    this.speech._loadVoices(); 
  }

  showData(){
    
    this.serv.getConfig()
      .subscribe((data:any) => this.configvar = {
        name : data.name,
        age : data.age
      });
      this.flag = 1
  }

  sendWord() {
    this.flag = 0
    this.sent_flag = 0
    
    if(!this.ipword.includes(" ")) {
      this.serv.getTranslation(this.ipword)
        .subscribe((data:any) => this.word = {
          eng : data.eng,
          tam : data.tam,
          pron : data.pron,
          syn : data.syn
        });

        console.log(this.ipword)
        setTimeout(()=>{this.flag=1},800)
        
        // console.log(this.word)
        return this.word
    }
    else {
      this.serv.getSentence(this.ipword)
        .subscribe((data:any) => this.sent = {
          eng : data.eng,
          tam : data.tam,
          pron : data.pron,
        });

        console.log(this.sent)
        setTimeout(()=>{this.sent_flag=1},800)
        return this.sent
    }
  }

  speak(words: string) {

    console.log('inside speak fn -- ', words)
    let l = this.speech._fetchVoices()
    console.log('voice --> ', this.voice['name'])

    this.speech.setVoice(this.voice['name'])
    this.speech.speak({
        text: words,
    }).then(() => {
        console.log(words)
    }).catch(e => {
        console.error("An error occurred :", e)
    })
  }

}
