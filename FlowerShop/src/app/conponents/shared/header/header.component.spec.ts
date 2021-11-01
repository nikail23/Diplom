import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { KeycloakService } from 'keycloak-angular';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { keycloakSpy } from 'src/app/testing/keycloak.mock';
import { cartServiceSpy } from 'src/app/testing/cart.mock';
import { userServiceSpy } from 'src/app/testing/user.mock';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        MatDialogModule,
        RouterTestingModule,
        MatMenuModule,
        HttpClientModule,
      ],
      providers: [
        { provide: KeycloakService, useValue: keycloakSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: CartService, useValue: cartServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    userService = TestBed.inject(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call user service login', () => {
    component.logInButtonClick();
    expect(userService.logIn).toHaveBeenCalled();
  });

  it('should call user service logout', () => {
    component.logOutButtonClick();
    expect(userService.logOut).toHaveBeenCalled();
  });
});
