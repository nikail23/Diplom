import { By } from '@angular/platform-browser';
import { ChatService } from './../../services/chat.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KeycloakService } from 'keycloak-angular';
import { ChatComponent } from './chat.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { keycloakSpy } from 'src/app/testing/keycloak.mock';
import { chatServiceSpy } from 'src/app/testing/chat.mock';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ChatComponent],
      providers: [
        { provide: KeycloakService, useValue: keycloakSpy },
        { provide: ChatService, useValue: chatServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show/hide chat if logged/not logged in', () => {
    component.chatService.isLoggedIn = false;
    fixture.detectChanges();
    let chat = fixture.debugElement.query(By.css('.chat'));
    expect(chat).toBeNull();
    component.chatService.isLoggedIn = true;
    fixture.detectChanges();
    chat = fixture.debugElement.query(By.css('.chat'));
    expect(chat).toBeDefined();
  });

  it('should show/hide content by button click', () => {
    component.chatService.isLoggedIn = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.chat__button'));
    let content = fixture.debugElement.query(By.css('.chat__content'));
    expect(content).toBeNull();
    button.triggerEventHandler('click', {});
    content = fixture.debugElement.query(By.css('.chat__content'));
    expect(content).toBeDefined();
  });

  it('should call ChatService sendMessage() when sending message', () => {
    component.message = 'Message';
    component.sendMessage();
    fixture.detectChanges();
    expect(component.chatService.sendMessage).toHaveBeenCalled();
  });
});
