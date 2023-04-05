import { Module, Global } from '@nestjs/common';
import PasswordHash from './passwordHash/passwordHash.service';

@Global()
@Module({ providers: [PasswordHash], exports: [PasswordHash] })
class CommonModule {}

export default CommonModule;
