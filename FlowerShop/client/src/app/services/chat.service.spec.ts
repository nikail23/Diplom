import { userServiceSpy } from 'src/app/testing/user.mock';
import { Message } from './../classes/chat';
import { UserService } from './user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KeycloakService } from 'keycloak-angular';
import { TestBed } from '@angular/core/testing';
import { ChatService } from './chat.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChatServerService } from './chat-server.service';
import { keycloakSpy } from '../testing/keycloak.mock';
import { chatServerServiceSpy } from '../testing/chat.mock';

describe('ChatService', () => {
  let service: ChatService;
  let serverService: ChatServerService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: KeycloakService, useValue: keycloakSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: ChatServerService, useValue: chatServerServiceSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    serverService = TestBed.inject(ChatServerService);
    service = TestBed.inject(ChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('send message should call ChatServerService sendMessage()', () => {
    service.sendMessage('message');
    expect(serverService.sendMessage).toHaveBeenCalled();
  });

  it('on init should call ChatServerService openWebSocket()', () => {
    expect(serverService.openWebSocket).toHaveBeenCalled();
  });

  it('should check current user as message author', () => {
    const message: Message = {
      sender: {
        id: 0
      },
      message: 'message',
      chatRoom: {
        id: 0
      }
    };

    expect(service.currentUserAuthorCheck(message)).toBeTrue();
    message.sender.id = 10;
    expect(service.currentUserAuthorCheck(message)).toBeFalse();
  });
});
