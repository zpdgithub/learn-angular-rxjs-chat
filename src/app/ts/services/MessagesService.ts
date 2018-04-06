import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { User, Thread, Message } from '../models';

// 初始messages
const initialMessages: Message[] = [];

// 消息操作接口
interface IMessagesOperation extends Function {
  (messages: Message[]): Message[];
}

@Injectable()
export class MessagesService {
  // newMessages流，每条只发出一次，单个Message对象
  newMessages: Subject<Message> = new Subject<Message>();

  // 一组Message对象
  messages: Observable<Message[]>;

  // 操作流，应用于messages流的函数流
  updates: Subject<any> = new Subject<any>();

  // 添加Message的方法
  addMessage(message: Message): void {
    this.newMessages.next(message);
  }
  // 过滤Message
  messagesForThreadUser(thread: Thread, user: User): Observable<Message> {
    return this.newMessages
      .filter((message: Message) => {
        // belongs to this thread
        return (message.thread.id === thread.id) &&
          // and isn't authored by this user
          (message.author.id !== user.id);
      });
  }
}
export const messagesServiceInjectables: Array<any> = [
  MessagesService
];
