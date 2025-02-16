import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CollaboratorsModule } from './collaborators/collaborators.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JourneysModule } from './journeys/journeys.module';
import { JobsModule } from './jobs/jobs.module';
import { QueueModule } from './queue/queue.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TimerModule } from './timer/timer.module';
import { RunJobsModule } from './run-jobs/run-jobs.module';
import { SenderModule } from './sender/sender.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const uri = process.env.DB_HOST ?? 'localhost'
        console.log(uri)
        return { uri };
      },
      inject: [ConfigService],
      connectionName: 'default',
    }),
    CollaboratorsModule,
    JourneysModule,
    JobsModule,
    QueueModule,
    TimerModule,
    RunJobsModule,
    SenderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }