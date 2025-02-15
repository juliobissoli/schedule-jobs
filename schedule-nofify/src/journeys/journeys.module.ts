import { Module } from '@nestjs/common';
import { JourneysService } from './journeys.service';
import { JourneysController } from './journeys.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Journey, JourneySchema } from './entities/journey.entity';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Journey.name, schema: JourneySchema }],
      'default',
    )
  ],
  controllers: [JourneysController],
  providers: [JourneysService],
  exports: [JourneysService, 
    MongooseModule.forFeature([{ name: Journey.name, schema: JourneySchema }])
  ],
})
export class JourneysModule { }
