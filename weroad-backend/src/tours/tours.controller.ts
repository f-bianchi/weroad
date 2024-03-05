import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { EditorGuard } from '../roles/roles.guard';
import { PaginationRequestDto, PaginationResponseDto } from '../utils/paginated-response.dto';
import { TourFiltersDto } from './dto/tour-filters.dto';
import { TourDto } from './dto/tour.dto';
import { Tour } from './entities/tour.entity';
import { ToursService } from './tours.service';

@Controller()
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Get('travels/:slug/tours')
  findTours(
    @Param('slug') slug: string,
    @Query() queryDto: TourFiltersDto,
  ): Promise<PaginationResponseDto<Tour>> {
    return this.toursService.findTravelTours(slug, queryDto);
  }

  /* ADMIN */
  @UseGuards(AuthGuard, EditorGuard)
  @Get('admin/travels/:id/tours')
  findAll(
    @Param('id') id: string,
    @Query() queryDto: PaginationRequestDto,
  ): Promise<PaginationResponseDto<Tour>> {
    return this.toursService.findAll(id, queryDto);
  }

  @UseGuards(AuthGuard, EditorGuard)
  @Get('admin/tours/:id')
  async findOne(@Param('id') id: string): Promise<Tour> {
    const tour = await this.toursService.findOneById(id);
    if (!tour) {
      throw new NotFoundException();
    }
    return tour;
  }

  @UseGuards(AuthGuard, EditorGuard)
  @Post('admin/tours')
  create(@Body() dto: TourDto): Promise<Tour> {
    return this.toursService.create(dto);
  }

  @UseGuards(AuthGuard, EditorGuard)
  @Put('admin/tours/:id')
  update(@Param('id') id: string, @Body() dto: TourDto): Promise<Tour> {
    return this.toursService.update(id, dto);
  }

  @UseGuards(AuthGuard, EditorGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('admin/tours/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.toursService.remove(id);
  }
}
