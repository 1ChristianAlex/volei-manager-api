import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { PassportStrategy } from '@nestjs/passport';
import { UserOutputDto } from 'src/modules/user/controllers/DTOs/user.dto';

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: UserOutputDto): Promise<UserOutputDto> {
    return payload;
  }
}

export default JwtStrategy;
