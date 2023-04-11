import { Injectable } from '@nestjs/common';
import { MatchInputDto } from '../controllers/dto/match.dto';
import MatchEntity, { MatchStatus } from '../entities/matchs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
class MatchService {
  constructor(
    @InjectRepository(MatchEntity)
    private matchRepository: Repository<MatchEntity>
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
}

export default MatchService;
