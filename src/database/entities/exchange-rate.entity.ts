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
export class ExchangeRate {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  public id: number;

  @Column({ type: 'varchar' })
  public name: string;

  @Column({ type: 'varchar' })
  public logo: string;

  @Column({ type: 'varchar' })
  public price: string;

  @Column({ type: 'varchar' })
  public oneHour: string;

  @Column({ type: 'varchar' })
  public oneDay: string;

  @Column({ type: 'varchar' })
  public oneWeek: string;

  @Column({ type: 'varchar' })
  public market_cap: string;

  @Column({ type: 'varchar' })
  public volume_24h: string;

  @Column({ type: 'varchar' })
  public circulating_supply: number;

  @Column({ type: 'varchar' })
  public last_7days: number;

  // @Column({ type: 'varchar' })
  // public type: string;
  //
  // @Column({ type: 'varchar' })
  // public status: boolean;

  @CreateDateColumn({ name: 'created_at' })
  public created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updated_at: Date;
}
