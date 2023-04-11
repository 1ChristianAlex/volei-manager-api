import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PlayersEntity from '../entities/players.entity';
import MatchEntity from '../entities/matchs.entity';
import PaymentEntity from 'src/modules/payment/entities/payment.entity';

@Injectable()
class PlayerService {
  constructor(
    @InjectRepository(PlayersEntity)
    private playerRepository: Repository<PlayersEntity>,
    @InjectRepository(MatchEntity)
    private matchRepository: Repository<MatchEntity>,
    @InjectRepository(PaymentEntity)
    private paymentRepository: Repository<PaymentEntity>
  ) {}

  private async getMatchById(matchId: number): Promise<MatchEntity> {
    const [matchToJoin] = await this.matchRepository.find({
      where: { id: matchId },
      relations: { players: { user: true } },
    });

    if (!matchToJoin) {
      throw new NotFoundException('Partida não encontrada');
    }

    return matchToJoin;
  }

  async joinMatch(matchId: number, userId: number): Promise<void> {
    const matchToJoin = await this.getMatchById(matchId);

    const playerAlreadyIn = matchToJoin.players.some(
      (player) => player.user.id === userId
    );

    if (playerAlreadyIn) {
      throw new BadRequestException('Jogador já listado na partida.');
    }

    const newPlayer = new PlayersEntity({
      hoursPlayed: 0,
      isActive: true,
      match: matchToJoin,
      payment: null,
      user: { id: userId },
    });

    await this.playerRepository.save(newPlayer);
  }

  async unjoinMatch(matchId: number, userId: number): Promise<void> {
    await this.playerRepository.update(
      { match: { id: matchId }, user: { id: userId } },
      { isActive: false }
    );
  }

  async changePlayerTimePlayed(
    matchId: number,
    playerId: number,
    playedTime: number
  ): Promise<void> {
    await this.playerRepository.update({ id: playerId }, { hoursPlayed: playedTime });

    const [match] = await this.matchRepository.find({
      where: { id: matchId, players: { isActive: true } },
      relations: { players: { payment: true } },
    });

    const { players } = match;

    await Promise.all(
      players.map(async (player) => {
        const playersAtThisTime = players.filter(
          (atTime) => atTime.hoursPlayed <= player.hoursPlayed
        );

        const newPayment = new PaymentEntity({
          ...player.payment,
          value: (player.hoursPlayed * match.valueHour) / playersAtThisTime.length,
        });
        const newPlayer = new PlayersEntity(player);

        newPlayer.payment = newPayment;

        await this.playerRepository.update({ id: newPlayer.id }, newPlayer);
        await this.paymentRepository.update(
          { id: newPlayer.payment.id },
          newPlayer.payment
        );
      })
    );
  }
}

export default PlayerService;
