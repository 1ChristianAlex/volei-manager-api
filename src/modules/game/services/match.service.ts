import { Injectable } from '@nestjs/common';
import { MatchFinishInputDto, MatchInputDto } from '../controllers/dto/match.dto';
import MatchEntity, { MatchStatus } from '../entities/matchs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PlayersEntity from '../entities/players.entity';
import PaymentEntity, {
  PaymentStatus,
} from 'src/modules/payment/entities/payment.entity';

@Injectable()
class MatchService {
  constructor(
    @InjectRepository(MatchEntity)
    private matchRepository: Repository<MatchEntity>,
    @InjectRepository(PlayersEntity)
    private playerRepository: Repository<PlayersEntity>,
    @InjectRepository(PaymentEntity)
    private paymentRepository: Repository<PaymentEntity>
  ) {}
  async createNewMatch(newMatch: MatchInputDto, userId: number): Promise<MatchEntity> {
    const matchEntity = new MatchEntity({
      datetime: newMatch.datetime,
      status: MatchStatus.ON_GOING,
      title: newMatch.title,
      players: null,
      user: { id: userId },
    });

    const result = await this.matchRepository.save(matchEntity);

    return result;
  }

  async getAllMatchs(status?: MatchStatus): Promise<MatchEntity[]> {
    if (status) {
      return this.matchRepository.find({ where: { status }, order: { datetime: 'ASC' } });
    }

    return this.matchRepository.find({ where: { status }, order: { datetime: 'ASC' } });
  }

  async getById(id: number): Promise<MatchEntity> {
    const [match] = await this.matchRepository.find({
      where: { id },
      relations: { user: true, players: true },
    });

    return match;
  }

  async cancelMatch(id: number): Promise<MatchEntity> {
    await Promise.all([
      this.matchRepository.update({ id }, { status: MatchStatus.CANCEL }),
      this.playerRepository.update({ match: { id } }, { isActive: false, payment: null }),
    ]);

    return this.getById(id);
  }

  async finishMatch(match: MatchFinishInputDto): Promise<void> {
    await this.matchRepository.update(
      { id: match.id },
      {
        status: MatchStatus.FINISHED,
        finishDate: match.finishDate,
        valueHour: match.valueHour,
      }
    );

    const matchDatabase = await this.getById(match.id);

    const matchHoursPlayed =
      matchDatabase.finishDate.getHours() - matchDatabase.datetime.getHours();

    await this.playerRepository.update(
      { match: { id: match.id } },
      { hoursPlayed: matchHoursPlayed }
    );

    const { players } = matchDatabase;

    const activePlayers = players.filter((player) => player.isActive).length;

    const valuePerPlayer = matchHoursPlayed * (matchDatabase.valueHour / activePlayers);

    const payments = players.map(
      (player) =>
        new PaymentEntity({
          payed: 0,
          status: PaymentStatus.PENDING,
          value: valuePerPlayer,
          player,
        })
    );

    await this.paymentRepository.save(payments);
  }
}

export default MatchService;
