import { Component } from '@angular/core';
import { FileService } from './file.service';

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

  constructor(private serv:FileService){
    
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
    this.serv.getTranslation(this.ipword)
      .subscribe((data:any) => this.word = {
        eng : data.eng,
        tam : data.tam,
        pron : data.pron,
        syn : data.syn
      });
      this.flag = 1
      // console.log(this.word)
      return this.word
  }
  
}
