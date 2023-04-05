import { Module } from '@nestjs/common';
import PasswordHash from './passwordHash/passwordHash.service';

@Module({ providers: [PasswordHash], exports: [PasswordHash] })
class CommonModule {}

export default CommonModule;
