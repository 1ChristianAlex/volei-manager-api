import { IsEmail, IsNotEmpty } from 'class-validator';

class LoginInputDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export { LoginInputDto };
