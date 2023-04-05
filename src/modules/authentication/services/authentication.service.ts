import { Injectable } from '@nestjs/common';
import { AuthTokenModel, UserModel } from './models/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
class AuthenticationService {
  constructor(private jwtService: JwtService) {}
  public async doLogin(email: string, password: string): Promise<AuthTokenModel> {
    console.log({ password });
    const userModel = new UserModel('Christian', email);
    return await this.authTokenFactory(userModel);
  }

  async authTokenFactory(userModel: UserModel): Promise<AuthTokenModel> {
    return new AuthTokenModel(
      userModel,
      await this.writeToken(JSON.parse(JSON.stringify(userModel)))
    );
  }

  private async writeToken(userModel: UserModel): Promise<string> {
    return await this.jwtService.signAsync(userModel);
  }
}

export default AuthenticationService;
