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
  sent_flag:any = 0
  sent:any = {tam: null, pron: null}


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
          tam : data.tam,
          pron : data.pron,
        });

        console.log(this.sent)
        setTimeout(()=>{this.sent_flag=1},800)
        return this.sent
    }
  }
  
}
