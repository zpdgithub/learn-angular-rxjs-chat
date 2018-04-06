import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'chat-app',
  template: `(chat-app)`
})
export class ChatApp {
}


@NgModule({
  declarations: [
    ChatApp
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [ChatApp]
})
export class ChatAppModule { }
