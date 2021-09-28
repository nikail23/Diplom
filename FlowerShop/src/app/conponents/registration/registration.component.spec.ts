import { KeycloakTestingService } from '../../services/testing/keycloak-testing.service';
import { KeycloakService } from 'keycloak-angular';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { PopupComponent } from './../shared/popup/popup.component';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { By } from '@angular/platform-browser';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [RegistrationComponent, PopupComponent],
      providers: [{provide: KeycloakService, useClass: KeycloakTestingService}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show errors', () => {
    component.form.patchValue({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      homeAddress: '',
      password: '',
      repeatPassword: '',
    });
    component.registerButtonClick();
    fixture.detectChanges();

    const errors = fixture.debugElement.queryAll(By.css('.form__error'));

    expect(errors.length).toBe(7);
  });

  it('should set errors styles', () => {
    component.form.patchValue({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      homeAddress: '',
      password: '',
      repeatPassword: '',
    });
    component.registerButtonClick();
    fixture.detectChanges();

    const containers = fixture.debugElement.queryAll(
      By.css('.form__container_style_error')
    );

    expect(containers.length).toBe(7);
  });
});
