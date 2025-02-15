import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-job.dto';

// export class UpdateJobDto extends PartialType(CreateJobDto) {}

export class UpdateJobDto {
    startDate?: string;
    daily?: boolean;
    hour?: number;
    status?: string
    completedAt?: string
  }
