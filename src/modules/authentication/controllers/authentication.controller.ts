import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginInputDto, LoginOutputDto } from './DTOs/login.dto';
import AuthenticationService from '../services/authentication.service';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import LoggedUser from '../user.decorator';
import { UserOutputDto } from 'src/modules/user/controllers/DTOs/user.dto';

@Controller('authentication')
class AuthenticationController {
  constructor(private authService: AuthenticationService) {}
  @Post('login')
  async doLogin(@Body() loginInput: LoginInputDto): Promise<LoginOutputDto> {
    const user = await this.authService.doLogin(loginInput.email, loginInput.password);

    return this.authService.authTokenFactory(UserOutputDto.fromEntity(user));
  }

  @UseGuards(JwtAuthGuard)
  @Get('renew')
  renewToken(@LoggedUser() user: UserOutputDto): Promise<LoginOutputDto> {
    return this.authService.authTokenFactory(user);
  }
}

export default AuthenticationController;
