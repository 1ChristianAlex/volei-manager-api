import { Module } from '@nestjs/common';
import AuthenticationController from './controllers/authentication.controller';
import AuthenticationService from './services/authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import JwtStrategy from './jwt/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from '../user/entities/user.entity';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy],
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 86400000 },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  exports: [JwtStrategy],
})
class AuthenticationModule {}

export default AuthenticationModule;
