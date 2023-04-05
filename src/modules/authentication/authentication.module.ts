import { Module } from '@nestjs/common';
import AuthenticaitonController from './controllers/authenticaiton.controller';
import AuthenticationService from './services/authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import JwtStrategy from './jwt/jwt.strategy';

@Module({
  controllers: [AuthenticaitonController],
  providers: [AuthenticationService, JwtStrategy],
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 86400000 },
    }),
  ],
  exports: [JwtStrategy],
})
class AuthenticationModule {}

export default AuthenticationModule;
