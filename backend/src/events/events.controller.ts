import { Controller, Post, Get, Body, Query, Headers } from '@nestjs/common';
import { EventsService } from './events.service';
import { TelegramService } from '../telegram/telegram.service';
import { CreateEventDto } from './dto/create-event.dto';

const INIT_DATA_HEADER = 'x-telegram-init-data';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly telegramService: TelegramService,
  ) {}

  @Post()
  async create(
    @Body() createEventDto: CreateEventDto,
    @Headers(INIT_DATA_HEADER) initData?: string,
  ) {
    try {
      let userId: string | undefined;
      if (initData && this.telegramService.isConfigured()) {
        const validated = this.telegramService.validateInitData(initData);
        if (validated?.user) {
          userId = String(validated.user.id);
        }
      }
      return await this.eventsService.create(createEventDto, userId);
    } catch {
      // DB недоступна или таблица отсутствует — аналитика не критична, отвечаем 200
      return { ok: true };
    }
  }

  @Get()
  async findAll(@Query() filters: any) {
    try {
      return await this.eventsService.findAll(filters);
    } catch {
      return [];
    }
  }
}

