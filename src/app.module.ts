import { Module } from '@nestjs/common';
import AuthenticationModule from './modules/authentication/authentication.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormDatabaseContext } from './database/database';
import UserEntity from './modules/user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import CommonModule from './modules/common/common.module';
import MatchEntity from './modules/game/entities/matchs.entity';
import PlayersEntity from './modules/game/entities/players.entity';
import PaymentEntity from './modules/payment/entities/payment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: ormDatabaseContext.type as 'postgres',
      host: ormDatabaseContext.host,
      port: ormDatabaseContext.port,
      username: ormDatabaseContext.username,
      password: ormDatabaseContext.password,
      database: ormDatabaseContext.database,
      entities: [UserEntity, MatchEntity, PlayersEntity, PaymentEntity],
      synchronize: false,
      logging: true,
    }),
    CommonModule,
    AuthenticationModule,
  ],
})
export class AppModule {}
