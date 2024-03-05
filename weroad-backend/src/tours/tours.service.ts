import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Travel } from 'src/travels/entities/travel.entity';
import {
  PAGE_SIZE_DEFAULT,
  PaginationRequestDto,
  PaginationResponseDto,
} from 'src/utils/paginated-response.dto';
import {
  Between,
  FindOptionsOrder,
  FindOptionsWhere,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { TourFiltersDto } from './dto/tour-filters.dto';
import { TourDto } from './dto/tour.dto';
import { Tour } from './entities/tour.entity';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tour)
    private readonly toursRepository: Repository<Tour>,
    @InjectRepository(Travel)
    private readonly travelsRepository: Repository<Travel>,
  ) {}

  async findTravelTours(slug: string, dto: TourFiltersDto): Promise<PaginationResponseDto<Tour>> {
    const travel = await this.travelsRepository.findOne({
      where: { slug, isPublic: true },
    });
    if (!travel) {
      throw new NotFoundException(`Travel #${slug} not found`);
    }

    const where = this.getWhereFromQuery(dto);
    where.travel = { id: travel.id };

    const { page = 1, pageSize = PAGE_SIZE_DEFAULT } = dto;
    const [items, total] = await this.toursRepository.findAndCount({
      where,
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: this.getOrderFromQuery(dto),
    });
    return {
      items,
      total,
    };
  }

  /* ADMIN */

  async create(dto: TourDto) {
    return await this.saveTour(dto);
  }

  async findAll(
    travelId: string,
    queryDto: PaginationRequestDto,
  ): Promise<PaginationResponseDto<Tour>> {
    const { page = 1, pageSize = PAGE_SIZE_DEFAULT } = queryDto;
    const [items, total] = await this.toursRepository.findAndCount({
      where: { travel: { id: travelId } },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
    return {
      items,
      total,
    };
  }

  async findOne(id: string): Promise<Tour | null> {
    return await this.toursRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, dto: TourDto) {
    dto.id = id;
    return await this.saveTour(dto);
  }

  async remove(id: string) {
    await this.toursRepository.delete(id);
  }

  private async saveTour(dto: TourDto): Promise<Tour> {
    const travel = await this.travelsRepository.findOne({
      where: { id: dto.travelId },
    });
    if (!travel) {
      throw new BadRequestException(`Travel #${dto.travelId} not found`);
    }
    const newTour = this.toursRepository.create({
      id: dto.id,
      name: dto.name,
      startingDate: dto.startingDate,
      endingDate: dto.endingDate,
      price: dto.price * 100,
      travel,
    });
    return await this.toursRepository.save(newTour);
  }

  private getWhereFromQuery(dto: TourFiltersDto): FindOptionsWhere<Tour> {
    const { priceFrom, priceTo, startingDate, endingDate } = dto;
    const where: FindOptionsWhere<Tour> = {};
    if (priceFrom >= 0 && priceTo >= 0) {
      where.price = Between(priceFrom * 100, priceTo * 100);
    } else if (priceFrom >= 0) {
      where.price = MoreThanOrEqual(priceFrom * 100);
    } else if (priceTo >= 0) {
      where.price = LessThanOrEqual(priceTo * 100);
    }

    if (startingDate) {
      where.startingDate = MoreThanOrEqual(startingDate);
    }
    if (endingDate) {
      where.endingDate = LessThanOrEqual(endingDate);
    }

    return where;
  }

  private getOrderFromQuery(dto: TourFiltersDto): FindOptionsOrder<Tour> {
    const { sort, order } = dto;
    const result: FindOptionsOrder<Tour> = {};

    if (sort && order) {
      result[sort] = order;
    }

    result.startingDate = 'ASC';
    return result;
  }
}
