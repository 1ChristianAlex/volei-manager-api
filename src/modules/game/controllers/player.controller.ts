import { Body, Controller, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/authentication/jwt/jwt-auth.guard';
import PlayerService from '../services/player.service';
import LoggedUser from 'src/modules/authentication/user.decorator';
import { UserOutputDto } from 'src/modules/user/controllers/DTOs/user.dto';
import { PlayerPlaytimeInputDto } from './dto/player.dto';

@UseGuards(JwtAuthGuard)
@Controller('player')
class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Post('join/:matchId')
  async joinPlayerMatch(
    @Param('matchId', new ParseIntPipe()) matchId: number,
    @LoggedUser() user: UserOutputDto
  ): Promise<void> {
    await this.playerService.joinMatch(matchId, user.id);
  }

  @Post('unjoin/:matchId')
  async removeFromMatch(
    @Param('matchId', new ParseIntPipe()) matchId: number,
    @LoggedUser() user: UserOutputDto
  ): Promise<void> {
    await this.playerService.unjoinMatch(matchId, user.id);
  }

  @Post('changePlaytime')
  async changePlayerTimePlayed(@Body() body: PlayerPlaytimeInputDto): Promise<void> {
    await this.playerService.changePlayerTimePlayed(
      body.matchId,
      body.playerId,
      body.playedTime
    );
  }
}

export default PlayerController;
