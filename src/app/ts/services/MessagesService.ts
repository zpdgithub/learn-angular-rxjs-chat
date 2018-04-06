import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { User, Thread, Message } from '../models';

@Injectable()
export class MessagesService {
  // newMessages流，每条只发出一次
  newMessages: Subject<Message> = new Subject<Message>();
}
export const messagesServiceInjectables: Array<any> = [
  MessagesService
];
