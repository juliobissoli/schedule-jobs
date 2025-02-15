import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from './entities/job.entity';
import { JourneysModule } from 'src/journeys/journeys.module';
import { CollaboratorsModule } from 'src/collaborators/collaborators.module';
import { Journey, JourneySchema } from 'src/journeys/entities/journey.entity';
import { Collaborator, CollaboratorSchema } from 'src/collaborators/entities/collaborator.entity';

@Module({
  imports: [
    MongooseModule.forFeature( [
      { name: Job.name, schema: JobSchema },
      { name: Journey.name, schema: JourneySchema },
      { name: Collaborator.name, schema: CollaboratorSchema },
    ], 'default'),
    JourneysModule,
    CollaboratorsModule
  ],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule { }
