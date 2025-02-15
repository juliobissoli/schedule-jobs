import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,  HydratedDocument,  Schema as MongooseSchema } from 'mongoose';
import { Job } from 'src/jobs/entities/job.entity';
import { ActionsTrigger, IJourneyAction } from 'src/journeys/entities/journey.entity';


export interface ILogRunJob {
    date: Date;
    status: string,
    actionTrigger: ActionsTrigger;
    payload: string,
    error?: string
}

export interface IRunJobProcess {
    runnerId: string,
    jobId: string,
    journeyId: string,
    collaboratorId: string,
    action: IJourneyAction,
}

export type RunJobDocument = HydratedDocument<RunJob>;


@Schema()
export class RunJob extends Document {

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Job', required: true })
    job: Job;

    @Prop({ required: true })
    dateInit: Date;

    @Prop()
    dateEnd?: Date;

    @Prop({ required: true, enum: ['created', 'pending', 'in_progress', 'completed', 'failed'] })
    status: string;

    @Prop({ required: true, default: 0 })
    totalActions: number;

    @Prop({ required: true, default: 0 })
    actionsCompleted: number;

    @Prop({ required: true, default: 0 })
    totalAttempts: number;

    @Prop({ type: [Object], required: true })
    log: ILogRunJob[];

    @Prop()
    collaboratorName: String;

    @Prop()
    journeyName: String;

    @Prop({ required: true, default: Date.now })
    createdAt: Date;

}

export const RunJobSchema = SchemaFactory.createForClass(RunJob);

