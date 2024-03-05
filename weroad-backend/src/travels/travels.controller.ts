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
import { AdminGuard, EditorGuard } from '../roles/roles.guard';
import { PaginationRequestDto, PaginationResponseDto } from '../utils/paginated-response.dto';
import { TravelDto } from './dto/travel.dto';
import { Travel } from './entities/travel.entity';
import { TravelsService } from './travels.service';

@Controller()
export class TravelsController {
  constructor(private readonly travelsService: TravelsService) {}

  @Get('travels')
  findAllPublic(@Query() queryDto: PaginationRequestDto): Promise<PaginationResponseDto<Travel>> {
    return this.travelsService.findAllPublic(queryDto);
  }

  @Get('travels/:slug')
  async findOneSlug(@Param('slug') slug: string): Promise<Travel> {
    const travel = await this.travelsService.findOnePublic(slug);
    if (!travel) {
      throw new NotFoundException();
    }
    return travel;
  }

  /* ADMIN */

  @Get('admin/travels')
  @UseGuards(AuthGuard, EditorGuard)
  findAll(@Query() queryDto: PaginationRequestDto): Promise<PaginationResponseDto<Travel>> {
    return this.travelsService.findAll(queryDto);
  }

  @Get('admin/travels/:id')
  @UseGuards(AuthGuard, EditorGuard)
  async findOne(@Param('id') id: string): Promise<Travel> {
    const travel = await this.travelsService.findOneById(id);
    if (!travel) {
      throw new NotFoundException();
    }
    return travel;
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Post('admin/travels')
  create(@Body() createTravelDto: TravelDto): Promise<Travel> {
    return this.travelsService.create(createTravelDto);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Put('admin/travels/:id')
  update(@Param('id') id: string, @Body() dto: TravelDto): Promise<Travel> {
    return this.travelsService.update(id, dto);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('admin/travels/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.travelsService.remove(id);
  }
}
