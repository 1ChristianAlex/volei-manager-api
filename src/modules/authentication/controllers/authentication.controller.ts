import { Body, Controller, Post } from '@nestjs/common';
import { LoginInputDto, LoginOutputDto, RegisterInputDto } from './DTOs/login.dto';
import AuthenticationService from '../services/authentication.service';
import { UserOutputDto } from 'src/modules/user/controllers/DTOs/user.dto';

@Controller('authentication')
class AuthenticationController {
  constructor(private authService: AuthenticationService) {}
  @Post('login')
  async doLogin(@Body() loginInput: LoginInputDto): Promise<LoginOutputDto> {
    const user = await this.authService.doLogin(loginInput.email, loginInput.password);

    return this.authService.authTokenFactory(UserOutputDto.fromEntity(user));
  }

  @Post('register')
  async register(@Body() userInput: RegisterInputDto): Promise<void> {
    await this.authService.register(userInput);
  }
}

export default AuthenticationController;
