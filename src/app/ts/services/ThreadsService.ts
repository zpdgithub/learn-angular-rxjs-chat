import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Thread, Message } from '../models';
import { MessagesService } from './MessagesService';
import * as _ from 'underscore';

@Injectable()
export class ThreadsService {
  // `threads` is a observable that contains the most up to date list of threads
  // 当前一个Thread的映射（threads流）
  threads: Observable<{ [key: string]: Thread }>;

  // `orderedThreads` contains a newest-first chronological list of threads
  // 按时间逆序排列的Thread列表
  orderedThreads: Observable<Thread[]>;

  constructor(private messagesService: MessagesService) {
    this.threads = messagesService.messages
      .map((messages: Message[]) => {
        let threads: { [key: string]: Thread } = {};
        // Store the message's thread in our accumulator `threads`
        // 查看每个Message对象并返回唯一的Threads列表
        messages.map((message: Message) => {
          threads[message.thread.id] = threads[message.thread.id] ||
            message.thread;

          // Cache the most recent message for each thread
          // 每个Thread中都保存最新的Message
          let messagesThread: Thread = threads[message.thread.id];
          if (!messagesThread.lastMessage ||
            messagesThread.lastMessage.sentAt < message.sentAt) {
            messagesThread.lastMessage = message;
          }
        });
        return threads;
      });

    this.orderedThreads = this.threads
      .map((threadGroups: { [key: string]: Thread }) => {
        let threads: Thread[] = _.values(threadGroups);
        return _.sortBy(threads, (t: Thread) => t.lastMessage.sentAt).reverse();
      });
  }

}
export const threadsServiceInjectables: Array<any> = [
  ThreadsService
];
