export interface UpdateUserDto {
  email: string;
  firstName: string;
  homeAddress: string;
  lastName: string;
  phone: string;
  shippingAddress: string;
}

export interface ChangePasswordDto {
  newPassword: string;
  oldPassword: string;
}
