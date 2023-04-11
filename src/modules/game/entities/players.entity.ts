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

interface PlayersEntityConstructor {
  id?: number;
  isActive: boolean;
  hoursPlayed: number;
  user: Partial<UserEntity>;
  match: Partial<MatchEntity>;
  payment: Partial<PaymentEntity>;
}

@Entity({
  schema: PlayersEntity.tableInfo.schema,
  name: PlayersEntity.tableInfo.name,
})
class PlayersEntity {
  constructor(data: PlayersEntityConstructor) {
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'bool',
    default: true,
  })
  public isActive: boolean;

  @UpdateDateColumn()
  public updatedDate?: Date;

  @CreateDateColumn()
  public createAt?: Date;

  @Column({ type: 'integer', default: 0 })
  public hoursPlayed: number;

  @ManyToOne(() => UserEntity, (user) => user.players)
  public user: UserEntity;

  @ManyToOne(() => MatchEntity, (match) => match.players)
  public match: MatchEntity;

  @ManyToOne(() => PaymentEntity, (payment) => payment.player, { nullable: true })
  public payment: PaymentEntity;

  static readonly tableInfo = {
    name: 'players',
    schema: tableSchemas.game,
  };
}

export default PlayersEntity;
