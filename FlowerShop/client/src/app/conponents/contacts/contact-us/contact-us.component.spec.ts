import { ContactsService } from 'src/app/services/contacts.service';
import { PopupComponent } from './../../shared/popup/popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactUsComponent } from './contact-us.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { contactsServiceSpy } from 'src/app/testing/contacts.mock';

describe('ContactUsComponent', () => {
  let component: ContactUsComponent;
  let popup: PopupComponent;
  let fixture: ComponentFixture<ContactUsComponent>;
  let contactsService: ContactsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule],
      declarations: [ContactUsComponent, PopupComponent],
      providers: [{provide: ContactsService, useValue: contactsServiceSpy}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsComponent);
    popup = TestBed.createComponent(PopupComponent).componentInstance;
    contactsService = TestBed.inject(ContactsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call send message service method', () => {
    component.form.patchValue({
      name: 'Ilya',
      phone: '+375 29 777-77-77',
      text: 'Some text'
    });
    component.sendMessageButtonClick(popup);
    expect(contactsService.sendMessage).toHaveBeenCalled();
  });
});
