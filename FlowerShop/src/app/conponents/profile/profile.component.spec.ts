import { PopupComponent } from './../shared/popup/popup.component';
import { UserService } from 'src/app/services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { keycloakSpy } from 'src/app/testing/keycloak.mock';
import { getTestUserDto, userServiceSpy,  } from 'src/app/testing/user.mock';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let userService: UserService;
  let popup: PopupComponent;
  const testUserDto = getTestUserDto();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule],
      declarations: [ProfileComponent, PopupComponent],
      providers: [
        { provide: KeycloakService, useValue: keycloakSpy },
        { provide: UserService, useValue: userServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    userService = TestBed.inject(UserService);
    component = fixture.componentInstance;
    popup = TestBed.createComponent(PopupComponent).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load current user', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.accountForm.value).toEqual(testUserDto);
  });

  it('should call user service logout method on button logOut click', () => {
    component.logOutClick();
    fixture.detectChanges();
    expect(userService.logOut).toHaveBeenCalled();
  });

  it('should call user service changePassword method on changePassword button click', () => {
    component.isChangePasswordInputsShow = true;
    component.changePasswordForm.setValue({
      oldPassword: 'thvjkjdbx',
      newPassword: 'thvjkjdbx2000',
      newPasswordConfirm: 'thvjkjdbx2000',
    });
    fixture.detectChanges();
    component.changePasswordClick(popup);
    expect(userService.changePassword).toHaveBeenCalled();
  });

  it('should call user service updateUser method on saveChanges button click', () => {
    component.accountForm.setValue(testUserDto);
    fixture.detectChanges();
    component.saveChangesClick(popup);
    expect(userService.updateCurrentUser).toHaveBeenCalled();
  });
});
