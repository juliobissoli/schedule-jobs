import { Module } from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';
import { CollaboratorsController } from './collaborators.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Collaborator, CollaboratorSchema } from './entities/collaborator.entity';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Collaborator.name, schema: CollaboratorSchema }],
      'default',
    )
  ],
  controllers: [CollaboratorsController],
  providers: [CollaboratorsService],
  exports: [
    CollaboratorsService,
    MongooseModule.forFeature([{ name: Collaborator.name, schema: CollaboratorSchema }])
  ],

})
export class CollaboratorsModule { }
