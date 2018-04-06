import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from '../models';


/**
 * UserService manages our current user
 */
@Injectable() // 可注入（非必须）
export class UserService {
  currentUser: Subject<User> = new BehaviorSubject<User>(null); // currentUser流

  public setCurrentUser(newUser: User): void {
    this.currentUser.next(newUser);
  }
}

export const userServiceInjectables: Array<any> = [
  UserService
];
