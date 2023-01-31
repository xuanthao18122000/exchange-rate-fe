import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TopCryptoSpot {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  public id: number;

  @Column({ type: 'varchar' })
  public name: string;

  @Column({ type: 'varchar' })
  public logo_coin: string;

  @Column({ type: 'varchar' })
  public score: string;

  @Column({ type: 'varchar' })
  public tradding_voLumn24h: string;

  @Column({ type: 'varchar' })
  public percent: string;

  @Column({ type: 'varchar' })
  public avg_liquidity: string;

  @Column({ type: 'varchar' })
  public weekly_visits: string;

  @Column({ type: 'varchar' })
  public markets: string;

  @Column({ type: 'varchar' })
  public coins: string;

  @Column({ type: 'varchar' })
  public fiat_supported: number;

  @Column({ type: 'varchar' })
  public fiat_more: number;

  @Column({ type: 'varchar' })
  public volume_graph7d: number;

  @CreateDateColumn({ name: 'created_at' })
  public created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updated_at: Date;
}
