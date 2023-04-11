import { Module } from '@nestjs/common';
import MatchController from './controllers/match.controller';
import MatchService from './services/match.service';
import PlayerController from './controllers/player.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import PlayersEntity from './entities/players.entity';
import MatchEntity from './entities/matchs.entity';
import PlayerService from './services/player.service';

@Module({
  controllers: [MatchController, PlayerController],
  providers: [MatchService, PlayerService],
  imports: [TypeOrmModule.forFeature([MatchEntity, PlayersEntity])],
})
class GameModule {}

export default GameModule;
