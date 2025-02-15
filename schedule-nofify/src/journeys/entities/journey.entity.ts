import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export enum ActionsTrigger {
    SEND_MESSAGE_EMAIL = 'SEND_MESSAGE_EMAIL',
    SEND_MESSAGE_WHATSAPP = 'SEND_MESSAGE_WHATSAPP',
}

export interface IJourneyAction {
    payload: string;
    delay: number;
    mode: 'sender' | 'exec',
    trigger: ActionsTrigger;
    maxAttempts: number;
}

export type JourneyDocument = HydratedDocument<Journey>;

@Schema()
export class Journey extends Document {
    @ApiProperty()
    @Prop({ required: true })
    name: string;

    @ApiProperty({ required: false })
    @Prop({ required: false })
    description: string;

    @ApiProperty({ default: 'available' })
    @Prop({ default: 'available' })
    status: string;

    @ApiProperty({ type: [Object] })
    @Prop({
        type: [{
            payload: String,
            delay: Number,
            mode: String,
            trigger: String,
            maxAttempts: Number
        }]
    })
    actions: IJourneyAction[];

    @ApiProperty({ default: 0 })
    @Prop({ default: 0 })
    totalJobs: number;

    @ApiProperty({ default: false })
    @Prop({ default: false })
    isSequential: boolean;

    @ApiProperty({ required: true, default: Date.now })
    @Prop({ required: true, default: Date.now })
    createdAt: Date;

    @ApiProperty({ required: true, default: Date.now })
    @Prop({ required: true, default: Date.now, set: () => Date.now() })
    updatedAt: Date;
}

export const JourneySchema = SchemaFactory.createForClass(Journey);
