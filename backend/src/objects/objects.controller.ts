import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ObjectsService } from './objects.service';
import { CreateObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
import { QueryObjectsDto } from './dto/query-objects.dto';

@Controller('objects')
export class ObjectsController {
  constructor(private readonly objectsService: ObjectsService) {}

  @Post()
  create(@Body() createObjectDto: CreateObjectDto) {
    return this.objectsService.create(createObjectDto);
  }

  @Get()
  async findAll(@Query() query: QueryObjectsDto) {
    try {
      return await this.objectsService.findAll(query);
    } catch {
      return { data: [], total: 0, page: 1, limit: 20, totalPages: 0 };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.objectsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateObjectDto: UpdateObjectDto) {
    return this.objectsService.update(id, updateObjectDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.objectsService.remove(id);
  }
}

