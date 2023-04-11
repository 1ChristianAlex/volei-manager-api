import PlayersEntity from '../../entities/players.entity';
import { MatchInputDto, MatchOutputDto } from './match.dto';

class PlayersInputDto {
  public id?: number;

  public isActive: boolean;

  public hoursPlayed: number;

  public matchs: MatchInputDto;
}

class PlayersOutputDto {
  constructor(data: PlayersOutputDto) {
    Object.assign(this, data);
  }
  public id: number;

  public isActive: boolean;

  public updatedDate?: Date;

  public createAt?: Date;

  public hoursPlayed: number;

  public match: MatchOutputDto;

  static fromEntity = (entity: PlayersEntity): PlayersOutputDto =>
    new PlayersOutputDto({
      id: entity.id,
      isActive: entity.isActive,
      updatedDate: entity.updatedDate,
      createAt: entity.createAt,
      hoursPlayed: entity.hoursPlayed,
      match: entity.match ? MatchOutputDto.fromEntity(entity.match) : null,
    });
}

export { PlayersInputDto, PlayersOutputDto };
