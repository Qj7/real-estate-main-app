import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    // TODO: Extract user ID from Telegram WebApp initData or session
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll(@Query() filters: any) {
    return this.eventsService.findAll(filters);
  }
}

