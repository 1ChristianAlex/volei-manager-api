import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginInputDto } from './DTOs/login.dto';
import AuthenticationService from '../services/authentication.service';
import { AuthTokenModel, UserModel } from '../services/models/user.model';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import LoggedUser from '../user.decorator';

@Controller('authentication')
class AuthenticaitonController {
  constructor(private authService: AuthenticationService) {}
  @Post('login')
  async doLogin(@Body() loginInput: LoginInputDto): Promise<AuthTokenModel> {
    return this.authService.doLogin(loginInput.email, loginInput.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('renew')
  renewToken(@LoggedUser() user: UserModel): Promise<AuthTokenModel> {
    return this.authService.authTokenFactory(user);
  }
}

export default AuthenticaitonController;
