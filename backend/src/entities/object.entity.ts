import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Partner } from './partner.entity';
import { Developer } from './developer.entity';

export enum ObjectType {
  APARTMENT = 'apartment',
  STUDIO = 'studio',
  VILLA = 'villa',
  DEVELOPER_TOUR = 'developer_tour',
}

export enum ObjectStatus {
  FOR_SALE = 'for_sale',
  FOR_RENT = 'for_rent',
  UNDER_CONSTRUCTION = 'under_construction',
  PLANNED = 'planned',
}

export enum PublishedStatus {
  DRAFT = 'draft',
  MODERATION = 'moderation',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

@Entity('objects')
@Index(['published_status'])
@Index(['city'])
@Index(['type'])
@Index(['status'])
export class Property extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'jsonb', nullable: true })
  location: Record<string, any>;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  district: string;

  @Column({
    type: 'enum',
    enum: ObjectType,
  })
  type: ObjectType;

  @Column({ type: 'int', nullable: true })
  rooms: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  area: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  price_min: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  price_max: number;

  @Column({
    type: 'enum',
    enum: ObjectStatus,
  })
  status: ObjectStatus;

  @ManyToOne(() => Partner, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'partner_id' })
  partner: Partner;

  @Column({ type: 'uuid', nullable: true })
  partner_id: string;

  @ManyToOne(() => Developer, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'developer_id' })
  developer: Developer;

  @Column({ type: 'uuid', nullable: true })
  developer_id: string;

  @Column({ type: 'text', nullable: true })
  @Index()
  matterport_link: string;

  @Column({ type: 'jsonb', default: [] })
  images: string[];

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  added_date: Date;

  @Column({
    type: 'enum',
    enum: PublishedStatus,
    default: PublishedStatus.DRAFT,
  })
  published_status: PublishedStatus;

  @Column({ type: 'text', array: true, default: [] })
  tags: string[];

  @Column({ type: 'jsonb', default: {} })
  meta: Record<string, any>;
}
