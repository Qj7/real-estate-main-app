import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('miniapp_users')
@Index(['tg_id_hash'], { unique: true })
@Index(['origin_source'])
export class MiniAppUser extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  tg_id_hash: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  tg_username_hash: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  first_seen_at: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  last_seen_at: Date;

  @Column({ type: 'varchar', length: 100, default: 'main' })
  origin_source: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  campaign: string;

  @Column({ type: 'jsonb', default: {} })
  meta: Record<string, any>;
}
