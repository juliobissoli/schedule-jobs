import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';






export type CollaboratorDocument = HydratedDocument<Collaborator>;

@Schema()
export class Collaborator extends Document {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    phone: string;

    @Prop()
    status: string;

    @Prop({ default: 0 })
    totalJobs: number;

    @Prop({ required: true, default: Date.now })
    createdAt: Date;

    @Prop({ required: true, default: Date.now, set: () => Date.now() })
    updatedAt: Date;
}


export const CollaboratorSchema = SchemaFactory.createForClass(Collaborator);


