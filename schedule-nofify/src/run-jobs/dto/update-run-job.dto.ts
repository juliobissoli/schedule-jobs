import { PartialType } from '@nestjs/mapped-types';
import { CreateRunJobDto } from './create-run-job.dto';

export class UpdateRunJobDto extends PartialType(CreateRunJobDto) {}
