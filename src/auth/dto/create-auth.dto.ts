import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterAuthDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
export class LoginAuthAuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class LogoutAuthDto {
  @IsNotEmpty()
  id: string;
}
