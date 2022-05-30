import { of } from "rxjs";
import { UserService } from "src/app/services/user.service";

export function getTestUserDto() {
  return {
    email: '123@gmail.com',
    firstName: 'firstName',
    homeAddress: 'homeAddress',
    id: 0,
    lastName: 'lastName',
    phone: '+375 29 858-36-75',
    shippingAddress: 'shippingAddress',
  };
}

export function getTestChangePasswordDto() {
  return {
    oldPassword: 'thvjkjdbx',
    newPassword: 'thvjkjdbx2000'
  };
}

/*export const userServiceSpy = jasmine.createSpyObj<UserService>('UserService', [
  'getLoggedState',
  'getCurrentUserInfo',
  'updateCurrentUser',
  'changePassword',
  'logOut',
  'logIn'
]);*/
/*userServiceSpy.updateLoggedState.and.returnValue(of(true));
userServiceSpy.changePassword.and.returnValue(of(getTestUserDto()));
userServiceSpy.getCurrentUserInfo.and.returnValue(of(getTestUserDto()));
userServiceSpy.updateCurrentUser.and.returnValue(of(getTestUserDto()));
userServiceSpy.logIn.and.callFake(() => {});
userServiceSpy.logOut.and.callFake(() => {});*/
