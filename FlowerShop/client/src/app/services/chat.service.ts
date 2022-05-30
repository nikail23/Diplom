import { concatMap, filter, tap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Message } from './../classes/chat';
import { Injectable } from '@angular/core';
import { ChatServerService } from './chat-server.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public isLoggedIn: boolean = false;

  private chatId: number = 0;
  private userId: number = 0;

  public messages: Message[] = [];

  constructor(
    private userService: UserService,
    private chatServerService: ChatServerService
  ) {
    this.userService
      .loggedState
      .pipe(
        tap((isLoggedIn: boolean) => (this.isLoggedIn = isLoggedIn)),
        filter((isLoggedIn: boolean) => isLoggedIn),
        concatMap(() => this.chatServerService.getChatId())
      )
      .subscribe((chatInfo) => {
        this.userId = chatInfo.user.id;
        this.chatId = chatInfo.id;
        this.messages = chatInfo.messages;
        this.chatServerService.openWebSocket(this.chatId, this.messages);
      });
  }

  public sendMessage(text: string) {
    const message: Message = {
      sender: {
        id: this.userId,
      },
      message: text,
      chatRoom: {
        id: this.chatId,
      },
    };
    this.chatServerService.sendMessage(message);
  }

  public currentUserAuthorCheck(message: Message) {
    if (message.sender.id === this.userId) {
      return true;
    }
    return false;
  }
}
