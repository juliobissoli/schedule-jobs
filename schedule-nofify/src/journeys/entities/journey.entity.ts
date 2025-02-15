import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';


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
    @Prop({ required: true })
    name: string;

    @Prop({ required: false })
    description: string;

    @Prop({ default: 'available' })
    status: string;

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


    @Prop({ default: 0 })
    totalJobs: number;

    @Prop({ required: true, default: Date.now })
    createdAt: Date;

    @Prop({ required: true, default: Date.now, set: () => Date.now() })
    updatedAt: Date;

}


export const JourneySchema = SchemaFactory.createForClass(Journey);
