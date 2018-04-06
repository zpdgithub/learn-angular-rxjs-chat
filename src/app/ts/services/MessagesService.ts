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

  // 动作流
  create: Subject<Message> = new Subject<Message>();

  constructor() {
    this.messages = this.updates
      // watch the updates and accumulate operations on the messages
      // this.updates.scan创建一个新流，这个流订阅了updates流。scan内部执行的每一次，我们都会得到
      // 1) 经过累加的messages流
      // 2) 将要应用的新operation
      // 然后返回新的Message[]
      .scan(
        (messages: Message[], operation: IMessagesOperation) => {
          return operation(messages);
        },
        initialMessages
      )
      // 在多个订阅者之间共享同一个订阅，并为未来的订阅者重播n个最新的值
      .publishReplay(1)
      .refCount();

    // 对于我们接收并作为输入的每个Message对象来说，都返回IMessagesOperation，它会把这个消息添加到消息列表中
    // 换句话说，这个流会发出一个函数，这个函数接受Message对象的列表并把这个Message对象添加到消息列表中
    this.create
      .map(function (message: Message): IMessagesOperation {
        return (messages: Message[]) => {
          return messages.concat(message);
        };
      })
      // 订阅updates流来监听create流
      // 如果create流接收了一个Message对象，那么它会发出一个IMessagesOperation;
      //   updates流会接受这个IMessagesOperation，然后把Message对象添加到messages流中
      .subscribe(this.updates);
  }

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
