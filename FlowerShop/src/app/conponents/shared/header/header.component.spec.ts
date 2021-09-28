import { MatMenuModule } from '@angular/material/menu';
import { KeycloakTestingService } from '../../../services/testing/keycloak-testing.service';
import { KeycloakService } from 'keycloak-angular';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [RouterTestingModule, MatMenuModule],
      providers: [{provide: KeycloakService, useClass: KeycloakTestingService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call keycloak login', () => {
    inject([KeycloakService], (injectService: KeycloakService) => {
      component.logInButtonClick();

      expect(injectService.login).toHaveBeenCalled();
    });
  });

  it('should call keycloak logout', () => {
    inject([KeycloakService], (injectService: KeycloakService) => {
      component.logInButtonClick();

      expect(injectService.logout).toHaveBeenCalled();
    });
  });
});
