import { BaseCategoriesDto } from './base.dto';

export class UpdateCategoriesDto extends BaseCategoriesDto {
  completedAt: Date;
}