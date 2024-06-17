import { BaseUserDto } from './base.dto';

export class UpdateUserDto extends BaseUserDto {
  completedAt: Date;
}