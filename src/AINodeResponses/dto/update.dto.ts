import { BaseAINodeResponsesDto } from './base.dto';

export class UpdateAINodeResponsesDto extends BaseAINodeResponsesDto {
  completedAt: Date;
}