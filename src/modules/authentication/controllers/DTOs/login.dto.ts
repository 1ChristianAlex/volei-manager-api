import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserOutputDto } from 'src/modules/user/controllers/DTOs/user.dto';

class LoginInputDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

class LoginOutputDto {
  constructor(public token: string, private user: UserOutputDto) {}
}

class RegisterInputDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public password: string;
}

export { LoginInputDto, LoginOutputDto, RegisterInputDto };
