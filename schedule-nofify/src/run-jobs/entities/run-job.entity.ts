import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,  HydratedDocument,  Schema as MongooseSchema } from 'mongoose';
import { Job } from '../../jobs/entities/job.entity';
import { ActionsTrigger, IJourneyAction } from '../../journeys/entities/journey.entity';
import { ApiProperty } from '@nestjs/swagger';


export interface ILogRunJob {
    date: Date;
    status: string,
    actionTrigger: ActionsTrigger;
    payload: string,
    error?: string
}

export interface IRunJobProcess {
    runnerId: string,
    action: IJourneyAction,
}

export type RunJobDocument = HydratedDocument<RunJob>;


@Schema()
export class RunJob extends Document {

    @ApiProperty({ description: 'Referência ao Job associado' })
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Job', required: true })
    job: Job;

    @ApiProperty({ description: 'Data de início do job' })
    @Prop({ required: true })
    dateInit: Date;

    @ApiProperty({ description: 'Data de término do job', required: false })
    @Prop()
    dateEnd?: Date;

    @ApiProperty({ description: 'Status do job', enum: ['created', 'pending', 'in_progress', 'completed', 'failed'] })
    @Prop({ required: true, enum: ['created', 'pending', 'in_progress', 'completed', 'failed'] })
    status: string;

    @ApiProperty({ description: 'Total de ações a serem realizadas', default: 0 })
    @Prop({ required: true, default: 0 })
    totalActions: number;

    @ApiProperty({ description: 'Total de ações completadas', default: 0 })
    @Prop({ required: true, default: 0 })
    actionsCompleted: number;

    @ApiProperty({ description: 'Total de tentativas', default: 0 })
    @Prop({ required: true, default: 0 })
    totalAttempts: number;

    @ApiProperty({ description: 'Log das execuções do job', type: [Object] })
    @Prop({ type: [Object], required: true })
    log: ILogRunJob[];

    @ApiProperty({ description: 'Nome do colaborador', required: false })
    @Prop()
    collaboratorName: String;


    @ApiProperty({ description: 'Indica se o job é sequencial', default: false })
    @Prop({ default: false })
    isSequential: boolean;

    @ApiProperty({ description: 'Nome da jornada', required: false })
    @Prop()
    journeyName: String;

    @ApiProperty({ description: 'Data de criação do job', default: Date.now })
    @Prop({ required: true, default: Date.now })
    createdAt: Date;

}

export const RunJobSchema = SchemaFactory.createForClass(RunJob);

