import { Module, forwardRef } from '@nestjs/common';
import { RunJobsService } from './run-jobs.service';
import { RunJobsController } from './run-jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RunJob, RunJobSchema } from './entities/run-job.entity';
import { JobsModule } from 'src/jobs/jobs.module';
import { Job, JobSchema } from 'src/jobs/entities/job.entity';
import { QueueService } from 'src/queue/queue.service';
import { QueueModule } from 'src/queue/queue.module';
import { SenderModule } from 'src/sender/sender.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: RunJob.name, schema: RunJobSchema }],
      'default'
    ),
    JobsModule,
    SenderModule,
    // QueueModule,
    forwardRef(() => QueueModule), // Usando forwardRef para evitar dependência circular

  ],
  controllers: [RunJobsController],
  providers: [RunJobsService],
  exports: [RunJobsService]
})
export class RunJobsModule { }
