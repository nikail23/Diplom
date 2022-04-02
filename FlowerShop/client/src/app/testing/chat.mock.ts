import { ChatServerService } from 'src/app/services/chat-server.service';
import { ChatService } from '../services/chat.service';
import { of } from 'rxjs';

export const chatServiceSpy = jasmine.createSpyObj<ChatService>(
  'ChatService',
  ['sendMessage', 'currentUserAuthorCheck'],
  { messages: [] }
);
chatServiceSpy.currentUserAuthorCheck.and.returnValue(true);
chatServiceSpy.sendMessage.and.callFake(() => {});

export const testChatDto = {
  id: 0,
  user: {
    id: 0
  },
  messages: []
}

export const chatServerServiceSpy = jasmine.createSpyObj<ChatServerService>('ChatServerService', [
  'getChatId',
  'openWebSocket',
  'sendMessage'
]);
chatServerServiceSpy.getChatId.and.returnValue(of(testChatDto));
chatServerServiceSpy.openWebSocket.and.callFake(() => {});
chatServerServiceSpy.sendMessage.and.callFake(() => {});
