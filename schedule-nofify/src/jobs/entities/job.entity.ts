import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument,  Schema as MongooseSchema} from 'mongoose';
import { Collaborator } from '../../collaborators/entities/collaborator.entity';
import { IQueryFilters } from '../../commom.interfaces';
import { Journey } from '../../journeys/entities/journey.entity';


export type JobDocument = HydratedDocument<Job>;

@Schema()
export class Job extends Document {

    
    // @Prop({required: true})
    // journeyId: String;
    
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Journey', required: true })
    journey: Journey;
    
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Collaborator', required: true })
    collaborator: Collaborator;
    

    @Prop()
    collaboratorName: String;

    @Prop()
    collaboratorPhone: String;

    @Prop()
    collaboratorEmail: String;


    @Prop({ required: true, default: 'pending', enum: ['created', 'pending', 'in_progress', 'completed'] })
    status: string;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ default: false })
    daily: Boolean

    @Prop({default: 0})
    hour: number

    @Prop({ default: null })
    completedAt?: Date;

    @Prop({ required: true, default: Date.now })
    createdAt: Date;

    @Prop({ required: true, default: Date.now, set: () => Date.now() })
    updatedAt: Date;

}


export const JobSchema = SchemaFactory.createForClass(Job);


export interface IJobQueryFilters extends IQueryFilters {
    collaboratorId?: string;
    journeyId?: string;
  }