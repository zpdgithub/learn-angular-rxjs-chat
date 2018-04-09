import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import {
  FormsModule
} from '@angular/forms';

/*
 * Components
 */
import { ChatNavBar } from './components/ChatNavBar';
import {
  ChatThreads,
  ChatThread
} from './components/ChatThreads';
import {
  ChatWindow,
  ChatMessage
} from './components/ChatWindow';

/*
 * Injectables
 */
import { servicesInjectables } from './services/services';
import { utilInjectables } from './util/util';

/*
 * Services
 */
import {
  MessagesService,
  ThreadsService,
  UserService
} from './services/services';

import { ChatExampleData } from './ChatExampleData';

/*
 * Webpack
 */
require('../css/styles.css');

@Component({
  selector: 'chat-app',
  template: `
  <div>
    <nav-bar></nav-bar>
    <div class="container">
      <chat-threads></chat-threads>
      <chat-window></chat-window>
    </div>
  </div>
  `
})
class ChatApp {
  constructor(private messagesService: MessagesService,
    private threadsService: ThreadsService,
    private userService: UserService) {
    ChatExampleData.init(messagesService, threadsService, userService);
  }
}

@NgModule({
  declarations: [
    ChatApp,
    ChatNavBar,
    ChatThreads,
    ChatThread,
    ChatWindow,
    ChatMessage,
    utilInjectables
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  bootstrap: [ChatApp],
  providers: [servicesInjectables]
})
export class ChatAppModule { }
