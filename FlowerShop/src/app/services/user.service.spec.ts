import { getTestChangePasswordDto, getTestUserDto } from 'src/app/testing/user.mock';
import { KeycloakService } from 'keycloak-angular';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { keycloakSpy } from '../testing/keycloak.mock';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('UserService', () => {
  let service: UserService;
  let httpController: HttpTestingController;
  let keycloakService: KeycloakService;
  const testUserDto = getTestUserDto();
  const testChangePaswwordDto = getTestChangePasswordDto();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: KeycloakService, useValue: keycloakSpy}]
    });
    service = TestBed.inject(UserService);
    keycloakService = TestBed.inject(KeycloakService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get isLogged state', (done) => {
    service.getLoggedState().subscribe((receivedIsLogged) => {
      expect(receivedIsLogged).toEqual(true);
      expect(keycloakService.isLoggedIn).toHaveBeenCalled();
      done();
    });
  });

  it('should get current user info', () => {
    service.getCurrentUserInfo().subscribe((user) => {
      expect(user).toEqual(testUserDto);
    });

    const getUser = httpController.expectOne(environment.api.url + 'users/user');

    expect(getUser.request.method).toEqual('GET');

    getUser.flush(testUserDto);
  });

  it('should update current user info', () => {
    service.updateCurrentUser(testUserDto).subscribe((user) => {
      expect(user).toEqual(testUserDto);
    });

    const updateUser = httpController.expectOne(environment.api.url + 'users');

    expect(updateUser.request.method).toEqual('PATCH');

    updateUser.flush(testUserDto);
  });

  it('should change password', () => {
    service.changePassword(testChangePaswwordDto).subscribe((user) => {
      expect(user).toEqual(testUserDto);
    });

    const changePassword = httpController.expectOne(environment.api.url + 'users/change_password');

    expect(changePassword.request.method).toEqual('POST');

    changePassword.flush(testUserDto);
  });

  it('should call keycloak on logout/login', () => {
    service.logIn();
    service.isLogged = true;
    service.logOut();
    expect(keycloakService.login).toHaveBeenCalled();
    expect(keycloakService.logout).toHaveBeenCalled();
  });
});
