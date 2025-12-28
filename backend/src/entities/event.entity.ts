import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { MiniAppUser } from './miniapp-user.entity';
import { Property } from './object.entity';

export enum EventType {
  OPEN_APP = 'open_app',
  OPEN_PARTNER_SHOWROOM = 'open_partner_showroom',
  VIEW_OBJECT = 'view_object',
  START_TOUR = 'start_tour',
  END_TOUR = 'end_tour',
  FAVORITE_ADD = 'favorite_add',
  FAVORITE_REMOVE = 'favorite_remove',
  CLICK_CONTACT = 'click_contact',
}

@Entity('events')
@Index(['ts'])
@Index(['event'])
@Index(['user_miniapp_id'])
@Index(['object_id'])
@Index(['session_id'])
export class Event extends BaseEntity {
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  ts: Date;

  @Column({ type: 'uuid', nullable: true })
  @ManyToOne(() => MiniAppUser, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_miniapp_id' })
  user_miniapp_id: string;

  @Column({
    type: 'enum',
    enum: EventType,
  })
  event: EventType;

  @Column({ type: 'uuid', nullable: true })
  @ManyToOne(() => Property, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'object_id' })
  object_id: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  source: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  campaign: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  session_id: string;

  @Column({ type: 'int', nullable: true })
  duration_ms: number;

  @Column({ type: 'jsonb', default: {} })
  meta: Record<string, any>;
}
