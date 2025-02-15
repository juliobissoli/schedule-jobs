import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument,  Schema as MongooseSchema} from 'mongoose';
import { Collaborator } from '../../collaborators/entities/collaborator.entity';
import { IQueryFilters } from '../../commom.interfaces';
import { Journey } from '../../journeys/entities/journey.entity';
import { ApiProperty } from '@nestjs/swagger';


export type JobDocument = HydratedDocument<Job>;

@Schema()
export class Job extends Document {

    @ApiProperty({ example: '67afdef976d3e1464fa63223', description: 'Journey ref' })
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Journey', required: true })
    journey: Journey;
    
    @ApiProperty({ example: '60d5ec49f1b2c8b1f8e4e1a1', description: 'Collaborator ref' })
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Collaborator', required: true })
    collaborator: Collaborator;
    

    @ApiProperty({ example: 'John Doe', description: 'Name of the collaborator' })
    @Prop()
    collaboratorName: String;

    @ApiProperty({ example: '1234567890', description: 'Phone number of the collaborator' })
    @Prop()
    collaboratorPhone: String;

    @ApiProperty({ example: 'john.doe@example.com', description: 'Email of the collaborator' })
    @Prop()
    collaboratorEmail: String;


    @ApiProperty({ example: 'pending', description: 'Current status of the job' })
    @Prop({ required: true, default: 'pending', enum: ['created', 'pending', 'in_progress', 'completed'] })
    status: string;

    @ApiProperty({ description: 'Start date of the job' })
    @Prop({ required: true })
    startDate: Date;

    @ApiProperty({ example: false, description: 'Indicates if the job is daily' })
    @Prop({ default: false })
    daily: Boolean

    @ApiProperty({ example: 0, description: 'Hour of the job' })
    @Prop({ default: 0 })
    hour: number

    @ApiProperty({ description: 'Completion date of the job' })
    @Prop({ default: null })
    completedAt?: Date;

    @ApiProperty({ description: 'Creation date of the job' })
    @Prop({ required: true, default: Date.now })
    createdAt: Date;

    @ApiProperty({ description: 'Last updated date of the job' })
    @Prop({ required: true, default: Date.now, set: () => Date.now() })
    updatedAt: Date;

}


export const JobSchema = SchemaFactory.createForClass(Job);


export interface IJobQueryFilters extends IQueryFilters {
    collaboratorId?: string;
    journeyId?: string;
  }