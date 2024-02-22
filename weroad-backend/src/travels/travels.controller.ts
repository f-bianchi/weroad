import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard, EditorGuard } from 'src/roles/roles.guard';
import { PaginationResponseDto } from 'src/utils/paginated-response.dto';
import { TravelDto } from './dto/travel.dto';
import { Travel } from './entities/travel.entity';
import { TravelsService } from './travels.service';

@Controller()
export class TravelsController {
  constructor(private readonly travelsService: TravelsService) {}

  @Get('travels')
  findAllPublic(
    @Query('page') page = 1,
    @Query('page') pageSize = 10,
  ): Promise<PaginationResponseDto<Travel>> {
    return this.travelsService.findAllPublic({ page, pageSize });
  }

  @Get('travels/:slug')
  findOneSlug(@Param('slug') slug: string): Promise<Travel> {
    return this.travelsService.findOnePublic(slug);
  }

  /* ADMIN */

  @Get('admin/travels')
  @UseGuards(AuthGuard, EditorGuard)
  findAll() {
    return this.travelsService.findAll();
  }

  @Get('admin/travels/:id')
  @UseGuards(AuthGuard, EditorGuard)
  findOne(@Param('id') id: string): Promise<Travel> {
    return this.travelsService.findOne(id);
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
  @Delete('admin/travels/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.travelsService.remove(id);
  }
}
