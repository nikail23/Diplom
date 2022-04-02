import { Message } from '../classes/chat';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class ChatServerService {

  private stompClient?: Stomp.Client;

  private messages: Message[] = [];
  private chatId: number = 0;

  constructor(private http: HttpClient) { }

  public getChatId(): Observable<any> {
    return this.http.get(environment.api.url + 'chats/user');
  }

  public openWebSocket(chatId: number, messages?: Message[]) {
    this.messages = messages ?? [];
    this.chatId = chatId;
    const webSocket = new SockJS(environment.api.url + 'ws');
    this.stompClient = Stomp.over(webSocket);
    const _this = this;
    this.stompClient.connect({}, function (frame) {
      _this.stompClient?.subscribe(
        `/topic/chat/${_this.chatId}/messages`,
        function (response) {
          const message: Message = JSON.parse(response.body);
          _this.messages.push(message);
        }
      );
    });
  }

  public sendMessage(message: Message) {
    if (this.stompClient?.connected) {
      this.stompClient?.send(
        `/app/message`,
        {},
        JSON.stringify(message)
      );
    }
  }
}
