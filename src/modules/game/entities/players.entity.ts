import { tableSchemas } from '../../../database/tableSchemas';

import UserEntity from '../../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import MatchEntity from './matchs.entity';
import PaymentEntity from '../../payment/entities/payment.entity';

@Entity({
  schema: PlayersEntity.tableInfo.schema,
  name: PlayersEntity.tableInfo.name,
})
class PlayersEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'bool',
  })
  public isActive: boolean;

  @UpdateDateColumn()
  public updatedDate?: Date;

  @CreateDateColumn()
  public createAt?: Date;

  @Column({ type: 'integer' })
  public hoursPlayed: number;

  @ManyToOne(() => UserEntity, (user) => user.players)
  public user: UserEntity;

  @ManyToOne(() => MatchEntity, (match) => match.players)
  public match: MatchEntity;

  @ManyToOne(() => PaymentEntity, (payment) => payment.player)
  public payment: PaymentEntity;

  static readonly tableInfo = {
    name: 'players',
    schema: tableSchemas.game,
  };
}

export default PlayersEntity;
