import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserEntity from 'src/modules/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PasswordHash from 'src/modules/common/passwordHash/passwordHash.service';
import { LoginOutputDto } from '../controllers/DTOs/login.dto';
import { UserOutputDto } from 'src/modules/user/controllers/DTOs/user.dto';

@Injectable()
class AuthenticationService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private pwHash: PasswordHash
  ) {}
  public async doLogin(email: string, password: string): Promise<UserEntity> {
    const [user] = await this.usersRepository.find({
      where: { email: email.trim() },
      relations: { role: true },
    });

    if (!user || !(await this.pwHash.compareHash(user.password, password))) {
      throw new NotFoundException('Wrong Email / password');
    }

    return user;
  }

  async authTokenFactory(userOutput: UserOutputDto): Promise<LoginOutputDto> {
    return new LoginOutputDto(await this.writeToken(userOutput), userOutput);
  }

  private async writeToken(json: UserOutputDto): Promise<string> {
    return await this.jwtService.signAsync(JSON.parse(JSON.stringify(json)));
  }
}

export default AuthenticationService;
