import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Moods } from '../travels/entities/moods.entity';
import { PaginationRequestDto, PaginationResponseDto } from '../utils/paginated-response.dto';
import { TravelDto } from './dto/travel.dto';
import { Travel } from './entities/travel.entity';

@Injectable()
export class TravelsService {
  constructor(
    @InjectRepository(Travel)
    private readonly travelsRepository: Repository<Travel>,
    @InjectRepository(Moods)
    private readonly moodsRepository: Repository<Moods>,
  ) {}

  async findAllPublic(dto: PaginationRequestDto): Promise<PaginationResponseDto<Travel>> {
    const { page, pageSize } = dto;
    const [items, total] = await this.travelsRepository.findAndCount({
      where: { isPublic: true },
      take: pageSize,
      skip: (page - 1) * pageSize,
      relations: {
        tours: true,
      },
    });
    return {
      items,
      total,
    };
  }

  async findOnePublic(slug: string): Promise<Travel | null> {
    return await this.travelsRepository.findOne({
      where: { slug, isPublic: true },
      relations: {
        tours: true,
        moods: true,
      },
    });
  }

  /* ADMIN */

  async create(dto: TravelDto) {
    delete dto.id;
    return await this.saveTravel(dto);
  }

  async findAll(dto: PaginationRequestDto): Promise<PaginationResponseDto<Travel>> {
    const { page, pageSize } = dto;
    const [items, total] = await this.travelsRepository.findAndCount({
      take: pageSize,
      skip: (page - 1) * pageSize,
      relations: {
        tours: true,
      },
    });
    return {
      items,
      total,
    };
  }

  async findOneById(id: string): Promise<Travel | null> {
    return await this.travelsRepository.findOne({
      where: { id },
      relations: {
        tours: true,
        moods: true,
      },
    });
  }

  async update(id: string, dto: TravelDto) {
    dto.id = id;
    return await this.saveTravel(dto);
  }

  async remove(id: string) {
    await this.travelsRepository.delete(id);
  }

  async saveTravel(dto: TravelDto): Promise<Travel> {
    const moodsToCreate: DeepPartial<Moods> = { ...dto.moods };
    if (dto.id) {
      const moods = await this.moodsRepository.findOne({
        where: { travel: { id: dto.id } },
      });
      if (moods) {
        moodsToCreate.id = moods.id;
      }
    }

    const moods = this.moodsRepository.create(moodsToCreate);

    const newTravel = this.travelsRepository.create({
      id: dto.id,
      slug: dto.slug,
      name: dto.name,
      description: dto.description,
      numberOfDays: dto.numberOfDays,
      isPublic: dto.isPublic || false,
      moods,
    });

    const travel = await this.travelsRepository.save(newTravel);
    return await this.findOneById(travel.id);
  }
}
