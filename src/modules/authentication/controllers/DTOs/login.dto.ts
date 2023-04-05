import { IsEmail, IsNotEmpty } from 'class-validator';
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

export { LoginInputDto, LoginOutputDto };
