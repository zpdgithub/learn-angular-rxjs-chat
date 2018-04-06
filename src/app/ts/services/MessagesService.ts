import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { User, Thread, Message } from '../models';

@Injectable()
export class MessagesService {
  // newMessages流，每条只发出一次
  newMessages: Subject<Message> = new Subject<Message>();
  // 添加Message的方法
  addMessage(message: Message): void {
    this.newMessages.next(message);
  }
}
export const messagesServiceInjectables: Array<any> = [
  MessagesService
];
