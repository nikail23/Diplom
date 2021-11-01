import { testRegistrationDto } from '../../testing/registration.mock';
import { RegistrationService } from '../../services/registration.service';
import { ReactiveFormsModule } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { PopupComponent } from './../shared/popup/popup.component';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { keycloakSpy } from 'src/app/testing/keycloak.mock';
import { registrationServiceSpy } from 'src/app/testing/registration.mock';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let popup: PopupComponent;
  let registrationService: RegistrationService;
  let keycloakService: KeycloakService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule],
      declarations: [RegistrationComponent, PopupComponent],
      providers: [
        { provide: KeycloakService, useValue: keycloakSpy },
        {
          provide: RegistrationService,
          useValue: registrationServiceSpy,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    registrationServiceSpy.register.calls.reset();
    fixture = TestBed.createComponent(RegistrationComponent);
    popup = TestBed.createComponent(PopupComponent).componentInstance;
    registrationService = TestBed.inject(RegistrationService);
    keycloakService = TestBed.inject(KeycloakService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call register when form is unvalid', () => {
    component.isRulesChecked = false;
    component.registrationForm.patchValue({});
    component.registerButtonClick(popup);
    expect(registrationService.register).not.toHaveBeenCalled();
  });

  it('should call register when form is valid', () => {
    component.registrationForm.patchValue(testRegistrationDto);
    component.isRulesChecked = true;
    component.registerButtonClick(popup);
    expect(registrationService.register).toHaveBeenCalled();
  });

  it('should call keycloak login when login button clicked', () => {
    component.logInButtonClick();
    expect(keycloakService.login).toHaveBeenCalled();
  });

  it('should change isRulesChecked on button click', () => {
    component.isRulesCheckedChange(true);
    expect(component.isRulesChecked).toEqual(true);
    component.isRulesCheckedChange(false);
    expect(component.isRulesChecked).toEqual(false);
  });
});
