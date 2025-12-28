import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ILike } from 'typeorm';
import { Property } from '../entities/object.entity';
import { Partner } from '../entities/partner.entity';
import { Developer } from '../entities/developer.entity';
import { CreateObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
import { QueryObjectsDto } from './dto/query-objects.dto';
import { PublishedStatus } from '../entities/object.entity';

@Injectable()
export class ObjectsService {
  constructor(
    @InjectRepository(Property)
    private objectsRepository: Repository<Property>,
    @InjectRepository(Partner)
    private partnersRepository: Repository<Partner>,
    @InjectRepository(Developer)
    private developersRepository: Repository<Developer>,
  ) {}

  async create(createObjectDto: CreateObjectDto): Promise<Property> {
    const object = this.objectsRepository.create(createObjectDto);
    return await this.objectsRepository.save(object);
  }

  async findAll(query: QueryObjectsDto) {
    const { page = 1, limit = 20, city, type, status, published_status, search, partner_id } = query;
    const skip = (page - 1) * limit;

    const queryBuilder = this.objectsRepository
      .createQueryBuilder('object')
      .leftJoinAndSelect('object.partner', 'partner')
      .leftJoinAndSelect('object.developer', 'developer')
      .where('object.published_status = :published_status', {
        published_status: published_status || PublishedStatus.PUBLISHED,
      });

    if (city) {
      queryBuilder.andWhere('object.city = :city', { city });
    }

    if (type) {
      queryBuilder.andWhere('object.type = :type', { type });
    }

    if (status) {
      queryBuilder.andWhere('object.status = :status', { status });
    }

    if (partner_id) {
      queryBuilder.andWhere('object.partner_id = :partner_id', { partner_id });
    }

    if (search) {
      queryBuilder.andWhere(
        '(object.title ILIKE :search OR object.description ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    queryBuilder.orderBy('object.added_date', 'DESC').skip(skip).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Property> {
    const object = await this.objectsRepository.findOne({
      where: { id },
      relations: ['partner', 'developer'],
    });

    if (!object) {
      throw new NotFoundException(`Object with ID ${id} not found`);
    }

    return object;
  }

  async update(id: string, updateObjectDto: UpdateObjectDto): Promise<Property> {
    const object = await this.findOne(id);
    Object.assign(object, updateObjectDto);
    return await this.objectsRepository.save(object);
  }

  async remove(id: string): Promise<void> {
    const object = await this.findOne(id);
    await this.objectsRepository.remove(object);
  }
}

