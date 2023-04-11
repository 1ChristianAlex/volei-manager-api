import { IsDate, IsNumber, IsNumberString, IsString } from 'class-validator';
import MatchEntity, { MatchStatus } from '../../entities/matchs.entity';
import { PlayersInputDto, PlayersOutputDto } from './player.dto';

class MatchFinishInputDto {
  @IsNumberString()
  public id: number;

  @IsDate()
  public finishDate: Date;

  @IsNumber()
  public valueHour: number;
}

class MatchInputDto {
  public id?: number;

  @IsString()
  public title: string;

  @IsDate()
  public datetime: Date;

  public players: PlayersInputDto[];
}

class MatchInputUpdateDto extends MatchInputDto {
  @IsNumberString()
  public id?: number;
}

class MatchOutputDto {
  constructor(data: MatchOutputDto) {
    Object.assign(this, data);
  }

  public id: number;

  public title: string;

  public status: MatchStatus;

  public datetime: Date;

  public updatedDate?: Date;

  public createAt?: Date;

  public players: PlayersOutputDto[];

  static fromEntity = (matchEntity: MatchEntity): MatchOutputDto =>
    new MatchOutputDto({
      datetime: matchEntity.datetime,
      id: matchEntity.id,
      players: Array.isArray(matchEntity.players)
        ? matchEntity.players.map(PlayersOutputDto.fromEntity)
        : null,
      status: matchEntity.status,
      title: matchEntity.title,
      createAt: matchEntity.createAt,
      updatedDate: matchEntity.updatedDate,
    });
}

export { MatchOutputDto, MatchInputDto, MatchInputUpdateDto, MatchFinishInputDto };
