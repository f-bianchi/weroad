import { IsUUID } from 'class-validator';
import { PaginationRequestDto } from '../../utils/paginated-response.dto';

export class ToursQueryDto extends PaginationRequestDto {
  @IsUUID()
  travelId: string;
}
