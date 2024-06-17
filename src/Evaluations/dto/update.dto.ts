import { BaseEvaluationsDto } from './base.dto';

export class UpdateEvaluationsDto extends BaseEvaluationsDto {
  completedAt: Date;
}