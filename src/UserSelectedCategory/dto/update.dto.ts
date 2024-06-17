import { BaseUserSelectedCategoryDto } from './base.dto';

export class UpdateUserSelectedCategoryDto extends BaseUserSelectedCategoryDto {
  completedAt: Date;
}