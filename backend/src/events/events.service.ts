import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event, EventType } from '../entities/event.entity';
import { MiniAppUser } from '../entities/miniapp-user.entity';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    @InjectRepository(MiniAppUser)
    private miniappUsersRepository: Repository<MiniAppUser>,
  ) {}

  async create(createEventDto: CreateEventDto, userId?: string): Promise<Event> {
    const event = this.eventsRepository.create({
      ...createEventDto,
      user_miniapp_id: userId || null,
    });
    return await this.eventsRepository.save(event);
  }

  async findAll(filters?: {
    event?: EventType;
    object_id?: string;
    user_id?: string;
    start_date?: Date;
    end_date?: Date;
  }) {
    const queryBuilder = this.eventsRepository.createQueryBuilder('event');

    if (filters?.event) {
      queryBuilder.andWhere('event.event = :event', { event: filters.event });
    }

    if (filters?.object_id) {
      queryBuilder.andWhere('event.object_id = :object_id', { object_id: filters.object_id });
    }

    if (filters?.user_id) {
      queryBuilder.andWhere('event.user_miniapp_id = :user_id', { user_id: filters.user_id });
    }

    if (filters?.start_date) {
      queryBuilder.andWhere('event.ts >= :start_date', { start_date: filters.start_date });
    }

    if (filters?.end_date) {
      queryBuilder.andWhere('event.ts <= :end_date', { end_date: filters.end_date });
    }

    queryBuilder.orderBy('event.ts', 'DESC');

    return await queryBuilder.getMany();
  }
}

